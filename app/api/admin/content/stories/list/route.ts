import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function GET(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""
  const status = searchParams.get("status")
  const page = Number(searchParams.get("page") || 1)
  const limit = Number(searchParams.get("limit") || 20)
  const offset = (page - 1) * limit
  const supabase = getAdminSupabase()
  let sel = supabase.from("stories").select("*", { count: "exact" })
  if (q) sel = sel.ilike("title", `%${q}%`).or(`content.ilike.%${q}%`)
  if (status !== null && status !== undefined) sel = sel.eq("status", status)
  const { data, count, error } = await sel.order("story_date", { ascending: false }).order("created_at", { ascending: false }).range(offset, offset + limit - 1)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data || [], total_count: count || 0 })
}
