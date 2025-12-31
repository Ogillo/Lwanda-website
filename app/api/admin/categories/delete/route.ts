import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function POST(request: Request) {
  try {
    const { bucket, category } = await request.json()
    if (!bucket || !category) return NextResponse.json({ error: "Missing bucket or category" }, { status: 400 })
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    const supabase = createClient(supabaseUrl, serviceKey)
    const { data, error } = await supabase.storage.from(bucket).list(category, { limit: 1000 })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const paths = (data || []).map((f: any) => `${category}/${f.name}`)
    const { error: rmErr } = await supabase.storage.from(bucket).remove(paths.length ? paths : [`${category}/.keep`])
    if (rmErr) return NextResponse.json({ error: rmErr.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Delete category failed" }, { status: 500 })
  }
}
