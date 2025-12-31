import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  try {
    const auth = await adminAuth(req)
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
    
    const { bucket, fromPath, toPath } = await req.json()
    if (!bucket || !fromPath || !toPath) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getAdminSupabase()
    const { data, error } = await supabase.storage.from(bucket).copy(fromPath, toPath)
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    
    return NextResponse.json({ success: true, data })
  } catch (e) {
    return NextResponse.json({ error: "Copy failed" }, { status: 500 })
  }
}
