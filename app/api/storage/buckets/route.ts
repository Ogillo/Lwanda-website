import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function GET() {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)
    // listBuckets is admin-only; service role required
    // @ts-ignore
    const { data, error } = await (supabase.storage as any).listBuckets()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const buckets = (data || []).map((b: any) => ({ id: b.id, name: b.name ?? b.id, public: !!b.public }))
    return NextResponse.json({ buckets })
  } catch (error) {
    return NextResponse.json({ error: "Failed to list buckets" }, { status: 500 })
  }
}
