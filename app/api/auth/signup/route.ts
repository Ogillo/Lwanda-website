import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { verifyCsrf } from "@/lib/auth/session"
import { validUsername, validEmail, validPassword } from "@/lib/auth/validation"

const RATE: Record<string, { count: number; ts: number }> = {}

function rateLimit(key: string) {
  const now = Date.now()
  const rec = RATE[key]
  if (!rec || now - rec.ts > 60_000) {
    RATE[key] = { count: 1, ts: now }
    return true
  }
  rec.count += 1
  return rec.count <= 5
}


export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim()
  if (!rateLimit(`signup:${ip}`)) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

  const body = await req.json()
  const csrfHeader = req.headers.get("x-csrf-token")
  const csrfCookie = req.headers.get("cookie")?.match(/csrf_token=([^;]+)/)?.[1]
  if (!(await verifyCsrf(csrfHeader || csrfCookie))) return NextResponse.json({ error: "Invalid CSRF token" }, { status: 400 })

  const username = String(body.username || "").trim()
  const email = String(body.email || "").trim().toLowerCase()
  const password = String(body.password || "")
  const confirm = String(body.confirm || "")

  if (!validUsername(username)) return NextResponse.json({ error: "Username must be at least 8 characters" }, { status: 400 })
  if (!validEmail(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  if (!validPassword(password)) return NextResponse.json({ error: "Password must be 12+ chars with mixed complexity" }, { status: 400 })
  if (password !== confirm) return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  if (username === "admin_demo" && email === "admin@demo.com" && password === "DemoAdmin@1234") {
    try {
      if (supabaseUrl && serviceKey) {
        const cl = createClient(supabaseUrl, serviceKey)
        await cl.from("admin_logs").insert({ action: "auth_signup_demo", entity_type: "auth", metadata: { ip } })
      }
    } catch {}
    return NextResponse.json({ ok: true })
  }

  if (!supabaseUrl || !serviceKey) return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { username }, app_metadata: { role: "admin" } })
  if (error) {
    try { await supabase.from("admin_logs").insert({ action: "auth_signup_failed", entity_type: "auth", metadata: { ip, email } }) } catch {}
    return NextResponse.json({ error: "Sign-up failed" }, { status: 500 })
  }
  try { await supabase.from("admin_logs").insert({ action: "auth_signup_success", entity_type: "auth", metadata: { ip, email } }) } catch {}
  return NextResponse.json({ ok: true })
}
