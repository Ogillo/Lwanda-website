import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function GET(request: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)

    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get("bucket") || "gallery"
    const folder = searchParams.get("folder") || "ke258"

    const { data, error } = await supabase.storage.from(bucket).list(folder, { limit: 1000, sortBy: { column: "created_at", order: "desc" }, recursive: true })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const files = (data || [])
      .filter((item) => item.name)
      .map((obj) => {
        const path = `${folder}/${obj.name}`
        const url = supabase.storage.from(bucket).getPublicUrl(path, { transform: { width: 1200, quality: 85 } }).data.publicUrl
        const thumb = supabase.storage.from(bucket).getPublicUrl(path, { transform: { width: 400, height: 225, quality: 70 } }).data.publicUrl
        return {
          url,
          pathname: path,
          filename: obj.name,
          size: obj.metadata?.size ?? 0,
          uploadedAt: obj.created_at ?? obj.updated_at ?? new Date().toISOString(),
          bucket,
          thumbUrl: thumb,
        }
      })

    return NextResponse.json({ files })
  } catch (error) {
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}
