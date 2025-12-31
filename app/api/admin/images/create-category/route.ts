import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  try {
    const body = await req.json()
    const bucket = String(body.bucket || "gallery")
    const name = String(body.name)
    const slug = String(body.slug || name.toLowerCase().replace(/\s+/g, "-").slice(0, 240))
    const parent = body.parent || null
    const supabase = getAdminSupabase()
    await supabase.storage.from(bucket).list()
    const folder_path = slug
    const { error: upErr } = await supabase.storage.from(bucket).upload(`${folder_path}/.keep`, new Blob([new Uint8Array()]), { upsert: true, contentType: "text/plain" })
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })
    const { error } = await supabase.from("gallery_categories").insert({ name, slug, parent_id: parent, bucket, folder_path })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "Create category failed" }, { status: 500 })
  }
}

