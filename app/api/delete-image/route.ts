import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

async function validateAdmin(request: Request) {
  if (!supabaseUrl || !serviceKey) return { ok: false, error: "Supabase not configured" }
  const supabase = createClient(supabaseUrl, serviceKey)
  const auth = request.headers.get("authorization") || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined
  if (!token) return { ok: false, error: "Admin access required" }
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) return { ok: false, error: "Admin access required" }
  const role = (data.user.app_metadata as any)?.role || (data.user.user_metadata as any)?.role
  if (role !== "admin") return { ok: false, error: "Admin access required" }
  return { ok: true }
}

export async function DELETE(request: Request) {
  try {
    const auth = await validateAdmin(request)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    const supabase = createClient(supabaseUrl, serviceKey)
    const body = await request.json()
    const bucket = String(body.bucket || "")
    const folder = String(body.folder || "")
    const fileName = String(body.fileName || "")
    if (!bucket || !fileName) return NextResponse.json({ error: "Missing bucket or fileName" }, { status: 400 })
    const path = folder ? `${folder}/${fileName}` : fileName
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
