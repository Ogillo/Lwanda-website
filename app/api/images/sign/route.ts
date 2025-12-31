import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bucket = searchParams.get("bucket") || "children-photos"
  const path = searchParams.get("path")
  const expiresIn = Number(searchParams.get("expiresIn") || 3600)
  if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 })
  if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  const supabase = createClient(supabaseUrl, serviceKey)
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)
  if (error || !data) return NextResponse.json({ error: error?.message || "Failed to sign" }, { status: 500 })
  return NextResponse.json({ signedUrl: data.signedUrl })
}