import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await req.json()
  const supabase = getAdminSupabase()
  const payload: any = {
    title: body.title,
    content: body.content || "",
    event_time: body.event_time || null,
    event_date: body.event_date || null,
    location: body.location || null,
    media_path: body.media_path || null,
    excerpt: body.excerpt || (typeof body.content === "string" ? body.content.slice(0, 160) : null),
  }
  const { error } = await supabase.from("events").insert(payload)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
