import { z } from "zod"
import { getSlotsForDate } from "@/lib/scheduler/availability"

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dateParam = searchParams.get("date")

  const parsed = dateSchema.safeParse(dateParam)
  if (!parsed.success) {
    return Response.json({ error: "date query param required (YYYY-MM-DD)" }, { status: 400 })
  }

  const slots = await getSlotsForDate(parsed.data)
  return Response.json({ date: parsed.data, slots })
}
