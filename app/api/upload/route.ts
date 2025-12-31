import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const rateMap = new Map<string, { count: number; ts: number }>()

function rateLimit(ip: string, limit = 20, windowMs = 60_000) {
  const now = Date.now()
  const rec = rateMap.get(ip)
  if (!rec || now - rec.ts > windowMs) {
    rateMap.set(ip, { count: 1, ts: now })
    return true
  }
  if (rec.count >= limit) return false
  rec.count += 1
  return true
}

function getImageDimensions(buffer: ArrayBuffer, mime: string) {
  const bytes = new Uint8Array(buffer)
  if (mime === "image/png") {
    const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19]
    const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23]
    return { width, height }
  }
  if (mime === "image/gif") {
    const width = bytes[6] | (bytes[7] << 8)
    const height = bytes[8] | (bytes[9] << 8)
    return { width, height }
  }
  if (mime === "image/jpeg") {
    let i = 0
    while (i < bytes.length) {
      if (bytes[i] === 0xff) {
        const marker = bytes[i + 1]
        const len = (bytes[i + 2] << 8) + bytes[i + 3]
        if (marker === 0xc0 || marker === 0xc2) {
          const height = (bytes[i + 5] << 8) + bytes[i + 6]
          const width = (bytes[i + 7] << 8) + bytes[i + 8]
          return { width, height }
        }
        i += 2 + len
      } else {
        i += 1
      }
    }
  }
  return { width: 0, height: 0 }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin") || ""
    const referer = request.headers.get("referer") || ""
    if (origin && !origin.startsWith(siteUrl) && referer && !referer.startsWith(siteUrl)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 })
    }

    const ip = request.headers.get("x-forwarded-for") || "local"
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"
    const bucket = (formData.get("bucket") as string) || "gallery"
    const userId = (formData.get("userId") as string) || "anonymous"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const typeOk = ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    if (!typeOk) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const { width, height } = getImageDimensions(buffer, file.type)
    if (width < 100 || height < 100) {
      return NextResponse.json({ error: "Image dimensions too small" }, { status: 400 })
    }

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)

    const ext = file.name.split(".").pop() || "img"
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`
    const path = `ke258/${folder}/${userId}/${unique}`

    const { data, error } = await supabase.storage.from(bucket).upload(path, new Blob([buffer], { type: file.type }), {
      contentType: file.type,
      cacheControl: "86400",
      upsert: false,
    })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path, {
      transform: { width: 1200, quality: 85 },
    }).data.publicUrl

    return NextResponse.json(
      {
        url: publicUrl,
        bucket,
        path,
        filename: safeName,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        width,
        height,
        userId,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
