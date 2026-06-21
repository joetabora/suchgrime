import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  CMS_SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  validateAdminCredentials,
} from "@/lib/cms/auth"
import { loginSchema } from "@/lib/cms/validators"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const { email, password } = parsed.data
    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = await createSessionToken(email)
    const cookieStore = await cookies()
    cookieStore.set(CMS_SESSION_COOKIE, token, sessionCookieOptions())

    return NextResponse.json({ success: true, email })
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
