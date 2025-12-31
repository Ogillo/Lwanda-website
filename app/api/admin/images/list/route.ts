import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function GET(req: Request) {
  try {
    const auth = await adminAuth(req)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    const { searchParams } = new URL(req.url)
    const bucket = String(searchParams.get("bucket") || "gallery")
    const folder = String(searchParams.get("folder") || "")
    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 30)
    const supabase = getAdminSupabase()
    const offset = (page - 1) * limit
    const { data, error } = await supabase.storage.from(bucket).list(folder, { limit, offset, sortBy: { column: "name", order: "desc" } })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const items = (data || []).filter((e: any) => !!e.metadata).map((e: any) => {
      const path = folder ? `${folder}/${e.name}` : e.name
      const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
      const thumbUrl = `${url}?width=400`
      return { path, url, thumbUrl, size: e.metadata?.size, created_at: e.created_at }
    })
    return NextResponse.json({ items, total_count: items.length })
  } catch (e) {
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 })
  }
}
