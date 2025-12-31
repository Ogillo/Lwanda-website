import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)
    const payload = await request.json()
    const record = {
      bucket: String(payload.bucket || ""),
      path: String(payload.path || ""),
      filename: String(payload.filename || ""),
      size: Number(payload.size || 0),
      width: Number(payload.width || 0),
      height: Number(payload.height || 0),
      uploaded_at: payload.uploadedAt || new Date().toISOString(),
      public_url: supabase.storage.from(String(payload.bucket)).getPublicUrl(String(payload.path)).data.publicUrl,
    }
    const { error } = await supabase.from("gallery_items").insert(record)
    if (error) {
      // Don't fail the client flow if logging fails; return OK with warning
      return NextResponse.json({ warning: error.message, record }, { status: 200 })
    }
    return NextResponse.json({ ok: true, record }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to record image" }, { status: 500 })
  }
}
