import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "./lib/auth/session"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  if (url.pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_session")?.value || ""
    const data = await verify(cookie)
    if (!data || data.role !== "admin") {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("next", url.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }
