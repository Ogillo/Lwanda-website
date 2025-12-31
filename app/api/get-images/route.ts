import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function GET(request: Request) {
  try {
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    const supabase = createClient(supabaseUrl, serviceKey)
    const { searchParams } = new URL(request.url)
    const bucket = String(searchParams.get("bucket") || "")
    const folder = String(searchParams.get("folder") || "")
    if (!bucket) return NextResponse.json({ error: "Bucket required" }, { status: 400 })

    const { data, error } = await supabase.storage.from(bucket).list(folder, { limit: 100, sortBy: { column: "name", order: "asc" } })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const files = (data || [])
      .filter((f) => !!f.name)
      .map((f) => {
        const path = folder ? `${folder}/${f.name}` : f.name
        const url = supabase.storage.from(bucket).getPublicUrl(path, { transform: { width: 800, quality: 85 } }).data.publicUrl
        return { fileName: f.name, fileUrl: url, size: f.metadata?.size ?? 0, uploadedAt: f.updated_at ?? "" }
      })
    return NextResponse.json({ files }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 })
  }
}
