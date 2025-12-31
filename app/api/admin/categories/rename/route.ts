import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function POST(request: Request) {
  try {
    const { bucket, from, to } = await request.json()
    if (!bucket || !from || !to) return NextResponse.json({ error: "Missing bucket or folder names" }, { status: 400 })
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    const supabase = createClient(supabaseUrl, serviceKey)
    const { data, error } = await supabase.storage.from(bucket).list(from, { limit: 1000 })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    for (const f of data || []) {
      const oldPath = `${from}/${f.name}`
      const newPath = `${to}/${f.name}`
      const { error: mvErr } = await supabase.storage.from(bucket).move(oldPath, newPath)
      if (mvErr) return NextResponse.json({ error: mvErr.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Rename category failed" }, { status: 500 })
  }
}
