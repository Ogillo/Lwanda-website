import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

async function uploadOne(supabase: ReturnType<typeof getAdminSupabase>, bucket: string, folder: string | undefined, file: File) {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"]
  if (!allowed.includes(file.type)) {
    throw new Error("Unsupported file type. Allowed: JPG, PNG, GIF")
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large. Max 5MB")
  }
  const safe = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "_")
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`
  const path = folder ? `${folder}/${unique}` : unique
  const buf = await file.arrayBuffer()
  const blob = new Blob([buf], { type: file.type })
  
  // Use 'upsert: true' to overwrite if name conflict (unlikely with unique timestamp)
  // Ensure bucket exists or handle error if it doesn't (assuming buckets exist per setup)
  const { error, data } = await supabase.storage.from(bucket).upload(path, blob, { 
    contentType: file.type, 
    cacheControl: "3600", 
    upsert: true 
  })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
  const thumbUrl = supabase.storage.from(bucket).getPublicUrl(path, { transform: { width: 400, height: 225, quality: 70 } }).data.publicUrl
  return { path, url, thumbUrl, size: file.size }
}

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) {
    try {
      const supabase = getAdminSupabase()
      await supabase.from("admin_logs").insert({
        action: "unauthorized_upload_attempt",
        entity_type: "image",
        metadata: { userAgent: req.headers.get("user-agent") || null }
      }) as any
    } catch {}
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }
  
  try {
    const form = await req.formData()
    const bucket = String(form.get("bucket") || "gallery")
    const folder = String(form.get("folder") || "") || undefined
    
    // Handle 'files' (multiple) or 'file' (single)
    let files = form.getAll("files").filter((f) => f instanceof File) as File[]
    if (files.length === 0) {
       const singleFile = form.get("file")
       if (singleFile instanceof File) {
           files = [singleFile]
       }
    }

    if (files.length === 0) {
        return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const supabase = getAdminSupabase()
    
    // Verify bucket exists (optional, but good for debugging)
    // const { data: buckets } = await supabase.storage.listBuckets()
    // if (!buckets?.find(b => b.name === bucket)) {
    //    return NextResponse.json({ error: `Bucket '${bucket}' does not exist` }, { status: 400 })
    // }

    const concurrency = 4
    const results: any[] = []
    for (let i = 0; i < files.length; i += concurrency) {
      const slice = files.slice(i, i + concurrency)
      const chunk: any[] = []
      for (const f of slice) {
        try {
          chunk.push(await uploadOne(supabase, bucket, folder, f))
        } catch (err: any) {
          chunk.push({ error: err?.message || "Upload failed", name: f.name })
        }
      }
      results.push(...chunk)
    }

    const failed = results.filter((r) => r.error)
    const ok = results.filter((r) => !r.error)
    const status = ok.length ? 200 : 400
    return NextResponse.json({ files: results, uploaded: ok.length, failed: failed.length, success: ok.length > 0 }, { status })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 })
  }
}
