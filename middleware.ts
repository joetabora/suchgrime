import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { CMS_SESSION_COOKIE } from "@/lib/cms/auth"

async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.CMS_SESSION_SECRET
  if (!secret || secret.length < 32) return false
  try {
    await jwtVerify(token, new TextEncoder().encode(secret))
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login"
  const isCmsApi =
    pathname.startsWith("/api/cms") && !pathname.startsWith("/api/cms/auth/login")

  if (!isAdminRoute && !isCmsApi) {
    return NextResponse.next()
  }

  const token = request.cookies.get(CMS_SESSION_COOKIE)?.value
  const valid = token ? await verifyToken(token) : false

  if (!valid) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/cms/:path*"],
}
