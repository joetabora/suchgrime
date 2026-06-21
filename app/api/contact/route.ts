import { z } from "zod"
import { getDb } from "@/lib/db"
import { contactInquiries } from "@/lib/db/schema"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const db = getDb()
    if (db) {
      await db.insert(contactInquiries).values({
        name: data.name,
        email: data.email,
        projectType: data.projectType ?? null,
        message: data.message ?? null,
      })
    }

    return Response.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
