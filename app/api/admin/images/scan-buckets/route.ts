import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  try {
    const auth = await adminAuth(req)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    const supabase = getAdminSupabase()
    const heroBucket = process.env.NEXT_PUBLIC_HERO_BUCKET || "hero"
    const galleryBucket = process.env.NEXT_PUBLIC_GALLERY_BUCKET || "gallery"
    const heroList = await supabase.storage.from(heroBucket).list("hero", { limit: 1000 })
    const galleryList = await supabase.storage.from(galleryBucket).list("", { limit: 1000 })
    const mapped: any[] = []
    const unmapped: any[] = []
    for (const e of heroList.data || []) {
      if (!String(e.name).includes(".")) mapped.push({ type: "hero", folder: `hero/${e.name}` })
    }
    for (const e of galleryList.data || []) {
      if (!String(e.name).includes(".")) unmapped.push({ type: "gallery", folder: e.name })
    }
    return NextResponse.json({ mapped, unmapped })
  } catch (e) {
    return NextResponse.json({ error: "Scan failed" }, { status: 500 })
  }
}
