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
    const body = await request.json()
    const bucket = String(body.bucket || "")
    const folder = String(body.folder || "")
    const filename = String(body.filename || "")
    if (!bucket || !filename) {
      return NextResponse.json({ error: "Missing bucket or filename" }, { status: 400 })
    }
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
    const ext = safe.includes(".") ? safe.split(".").pop() : "img"
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`
    const path = folder ? `${folder}/${unique}` : unique
    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ bucket, path, signedUrl: data.signedUrl })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create signed upload URL" }, { status: 500 })
  }
}
