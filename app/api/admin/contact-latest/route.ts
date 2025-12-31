import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function GET(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit") || 3)
  const supabase = getAdminSupabase()
  const { data, error } = await supabase.from("contact_submissions").select("id,name,email,title,subject,message_preview,date").order("date", { ascending: false }).limit(limit)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}
