import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { CMS_SESSION_COOKIE } from "@/lib/cms/auth"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.set(CMS_SESSION_COOKIE, "", { ...{ httpOnly: true, path: "/" }, maxAge: 0 })
  return NextResponse.json({ success: true })
}
