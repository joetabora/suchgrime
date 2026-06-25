import { z } from "zod"
import { getDb } from "@/lib/db"
import { strategyCallBookings } from "@/lib/db/schema"
import { schedulerConfig } from "@/lib/scheduler/config"
import { getSlotsForDate } from "@/lib/scheduler/availability"
import { formatChicagoDateTime } from "@/lib/scheduler/timezone"
import {
  sendBookingAdminNotification,
  sendBookingConfirmation,
  isEmailConfigured,
} from "@/lib/email/send"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  notes: z.string().optional(),
  slotStart: z.string().datetime({ message: "Valid slot required" }),
  website: z.string().optional(),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rate = checkRateLimit(`booking:${ip}`, 5, 60 * 60 * 1000)
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 60) } },
    )
  }

  try {
    const body = await request.json()
    const data = bookingSchema.parse(body)

    if (data.website) {
      return Response.json({ success: true })
    }

    const slotDate = new Date(data.slotStart)
    const dateStr = data.slotStart.slice(0, 10)
    const openSlots = await getSlotsForDate(dateStr)
    const isOpen = openSlots.some((s) => s.slotStart === slotDate.toISOString())

    if (!isOpen) {
      return Response.json({ error: "This time slot is no longer available." }, { status: 409 })
    }

    const db = getDb()
    if (!db) {
      if (!isEmailConfigured()) {
        return Response.json(
          { error: "Booking is temporarily unavailable. Please email us directly." },
          { status: 503 },
        )
      }
    }

    let bookingId: number | null = null

    if (db) {
      try {
        const [row] = await db
          .insert(strategyCallBookings)
          .values({
            name: data.name,
            email: data.email,
            company: data.company ?? null,
            phone: data.phone ?? null,
            projectType: data.projectType ?? null,
            notes: data.notes ?? null,
            slotStart: slotDate,
            durationMin: schedulerConfig.slotDurationMin,
            status: "confirmed",
          })
          .returning({ id: strategyCallBookings.id })

        bookingId = row?.id ?? null
      } catch (err: unknown) {
        const pgCode = (err as { code?: string })?.code
        if (pgCode === "23505") {
          return Response.json({ error: "This time slot was just booked." }, { status: 409 })
        }
        throw err
      }
    }

    const emailData = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      projectType: data.projectType,
      notes: data.notes,
      slotStart: slotDate,
    }

    await Promise.all([
      sendBookingConfirmation(emailData),
      sendBookingAdminNotification(emailData),
    ])

    return Response.json({
      success: true,
      booking: {
        id: bookingId,
        slotStart: slotDate.toISOString(),
        formatted: formatChicagoDateTime(slotDate),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 })
    }
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
