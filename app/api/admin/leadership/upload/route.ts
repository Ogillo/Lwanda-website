import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { adminAuth } from "@/lib/supabase/admin"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])

function mapPositionToFolder(position: string): string {
  const p = (position || "").toLowerCase().trim()
  if (p.includes("director")) return "Director"
  if (p.includes("account")) return "Accountant"
  if (p.includes("pastor") || p.includes("patron")) return "Pastor"
  if (p.includes("social")) return "Social worker"
  if (p.includes("chairman")) return "Chairman"
  return "Other"
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const auth = await adminAuth(request)
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error || "Admin access required" }, { status: 401 })
    }

    const payload = await request.json()
    const leaderId = String(payload.leaderId || "")
    const position = String(payload.position || "")
    const filename = String(payload.filename || "")
    const size = Number(payload.size || 0)
    const type = String(payload.type || "")

    const supabase = createClient(supabaseUrl, serviceKey)

    const folder = mapPositionToFolder(position)
    if (!leaderId) return NextResponse.json({ error: "Missing leaderId" }, { status: 400 })
    if (!filename) return NextResponse.json({ error: "Missing filename" }, { status: 400 })
    if (!ALLOWED.has(type)) return NextResponse.json({ error: "Invalid file type" }, { status: 415 })
    if (size > MAX_SIZE) return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 413 })

    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
    const ext = safe.includes(".") ? safe.split(".").pop() : "img"
    const unique = `profile-${Date.now()}.${ext}`
    const path = `${folder}/${leaderId}/${unique}`

    const { data, error } = await supabase.storage.from("leaders").createSignedUploadUrl(path)
    const publicUrl = supabase.storage.from("leaders").getPublicUrl(path, { transform: { width: 400, quality: 85 } }).data.publicUrl

    await supabase.from("admin_logs").insert({
      action: "leadership_upload_init",
      entity_type: "leadership",
      entity_id: leaderId,
      metadata: { position, folder, filename: safe, size, type, path, ok: !error },
    })

    if (error || !data?.signedUrl) {
      const message = error?.message || "Failed to create signed upload URL"
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ bucket: "leaders", path, signedUrl: data.signedUrl, publicUrl }, { status: 200 })
  } catch (e: any) {
    const message = e?.message || "Upload init failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

