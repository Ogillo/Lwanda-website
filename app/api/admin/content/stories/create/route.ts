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
    excerpt: body.excerpt || (typeof body.content === "string" ? body.content.slice(0, 160) : null),
    story_date: body.story_date || null,
    tag: body.tag || null,
    status: body.status || null,
    image_path: body.image_path || null,
  }
  const { error } = await supabase.from("stories").insert(payload)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
