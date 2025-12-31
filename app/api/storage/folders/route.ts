import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function GET(request: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }
    const supabase = createClient(supabaseUrl, serviceKey)
    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get("bucket") || "gallery"
    const prefix = searchParams.get("prefix") || ""
    const { data, error } = await supabase.storage.from(bucket).list(prefix, { limit: 1000, sortBy: { column: "name", order: "asc" } })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    // Infer folders: entries that represent subdirectories under prefix
    // Heuristic: entries without metadata OR entries that do not have an extension
    const entries = (data || [])
    const folders = entries
      .filter((e: any) => !e.metadata || !String(e.name).includes("."))
      .map((e: any) => (prefix ? `${prefix}/${e.name}` : e.name))
    return NextResponse.json({ folders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to list folders" }, { status: 500 })
  }
}
