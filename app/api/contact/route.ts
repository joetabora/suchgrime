import { z } from "zod"
import { getDb } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"
import { sendContactNotification } from "@/lib/email/send"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().optional(),
  message: z.string().optional(),
  website: z.string().optional(),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rate = checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 60) } },
    )
  }

  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    if (data.website) {
      return Response.json({ success: true })
    }

    const db = getDb()
    let saved = false

    if (db) {
      await db.insert(contactInquiries).values({
        name: data.name,
        email: data.email,
        projectType: data.projectType ?? null,
        message: data.message ?? null,
      })
      saved = true
    }

    const emailed = await sendContactNotification({
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      message: data.message,
    })

    if (!saved && !emailed) {
      return Response.json(
        { error: "Unable to submit inquiry right now. Please email us directly." },
        { status: 503 },
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
