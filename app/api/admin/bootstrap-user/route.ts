import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
const whitelistEnv = (process.env.ADMIN_WHITELIST || "").split(",").map((s) => s.trim()).filter(Boolean)

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const allowed = new Set(["ogillovicky70@gmail.com", ...whitelistEnv])
    if (!allowed.has(String(email))) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const { data, error } = await supabase.auth.admin.createUser({
      email: String(email),
      password: String(password),
      email_confirm: true,
      user_metadata: { role: "admin" },
      app_metadata: { role: "admin" },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ ok: true, user: { id: data.user?.id, email: data.user?.email } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Bootstrap failed" }, { status: 500 })
  }
}

