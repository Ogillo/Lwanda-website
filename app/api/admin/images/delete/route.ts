import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function DELETE(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  try {
    const body = await req.json()
    const bucket = String(body.bucket)
    const path = String(body.path)
    const supabase = getAdminSupabase()
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}

