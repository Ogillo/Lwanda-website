import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function DELETE(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  const supabase = getAdminSupabase()
  const { error } = await supabase.from("events").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
