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

export async function POST(request: Request) {
  try {
    const auth = await validateAdmin(request)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    const supabase = createClient(supabaseUrl, serviceKey)

    const form = await request.formData()
    const file = form.get("file") as File | null
    const bucket = String(form.get("bucket") || "")
    const folder = String(form.get("folder") || "")
    if (!file || !bucket) return NextResponse.json({ error: "Missing file or bucket" }, { status: 400 })
    const type = file.type
    const allowed = ["image/jpeg", "image/png", "image/webp"]
    if (!allowed.includes(type)) return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File too large" }, { status: 400 })

    const safe = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "_")
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`
    const path = folder ? `${folder}/${unique}` : unique
    const buf = await file.arrayBuffer()
    const blob = new Blob([buf], { type })

    const { error } = await supabase.storage.from(bucket).upload(path, blob, {
      contentType: type,
      cacheControl: "86400",
      upsert: false,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path, { transform: { width: 1200, quality: 85 } }).data.publicUrl

    return NextResponse.json(
      {
        url: publicUrl,
        bucket,
        path,
        size: file.size,
        type,
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
