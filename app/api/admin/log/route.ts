import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    if (!supabaseUrl || !serviceKey) return NextResponse.json({ ok: true })
    const supabase = createClient(supabaseUrl, serviceKey)
    const { error } = await supabase.from("admin_logs").insert({
      action: payload.action,
      entity_type: payload.entityType,
      entity_id: payload.entityId ?? null,
      metadata: payload.metadata ?? null,
    }) as any
    if (error) return NextResponse.json({ ok: true })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
