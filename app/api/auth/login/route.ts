import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createSession, verifyCsrf } from "@/lib/auth/session"

const RATE: Record<string, { count: number; ts: number }> = {}

function rateLimit(key: string) {
  const now = Date.now()
  const rec = RATE[key]
  if (!rec || now - rec.ts > 60_000) {
    RATE[key] = { count: 1, ts: now }
    return true
  }
  rec.count += 1
  return rec.count <= 10
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim()
  if (!rateLimit(`login:${ip}`)) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

  const body = await req.json()
  const csrfHeader = req.headers.get("x-csrf-token")
  const csrfCookie = req.headers.get("cookie")?.match(/csrf_token=([^;]+)/)?.[1]
  if (!(await verifyCsrf(csrfHeader || csrfCookie))) return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 })

  const identifier = String(body.identifier || "").trim().toLowerCase()
  const password = String(body.password || "")
  const remember = !!body.remember

  if (identifier === "admin_demo" || identifier === "admin@demo.com") {
    if (password !== "DemoAdmin@1234") return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    const token = await createSession({ id: "demo", username: "admin_demo", email: "admin@demo.com", role: "admin" }, remember)
    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" })
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string
      if (url && key) {
        const cl = createClient(url, key)
        await cl.from("admin_logs").insert({ action: "auth_login_demo", entity_type: "auth", metadata: { ip } })
      }
    } catch {}
    return res
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  if (!supabaseUrl || !anonKey) return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
  const supabase = createClient(supabaseUrl, anonKey)
  const { data, error } = await supabase.auth.signInWithPassword({ email: identifier, password })
  if (error || !data.session) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  const user = data.user
  const role = (user?.app_metadata as any)?.role || (user?.user_metadata as any)?.role
  if (role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  const token = await createSession({ id: user!.id, username: (user?.user_metadata as any)?.username || "admin", email: user!.email!, role: "admin" }, remember)
  const res = NextResponse.json({ ok: true })
  res.cookies.set("admin_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" })
  try { await supabase.from("admin_logs").insert({ action: "auth_login_success", entity_type: "auth", metadata: { ip, email: identifier } }) } catch {}
  return res
}
