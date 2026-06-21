import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

export const CMS_SESSION_COOKIE = "cms_session"

function getSecret() {
  const secret = process.env.CMS_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("CMS_SESSION_SECRET must be set and at least 32 characters")
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return typeof payload.email === "string" ? payload.email : null
  } catch {
    return null
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.CMS_ADMIN_EMAIL
  const adminPassword = process.env.CMS_ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return false
  return email === adminEmail && password === adminPassword
}

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function requireSession(): Promise<string> {
  const email = await getSessionEmail()
  if (!email) throw new Error("Unauthorized")
  return email
}

export function sessionCookieOptions(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  }
}
