import { NextResponse } from "next/server"
import { createCsrfToken } from "@/lib/auth/session"

export async function GET() {
  const token = await createCsrfToken()
  const res = NextResponse.json({ token })
  res.cookies.set("csrf_token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" })
  return res
}
