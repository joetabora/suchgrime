import { and, gte, lte, ne } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { strategyCallBookings } from "@/lib/db/schema"
import { schedulerConfig } from "./config"
import {
  chicagoLocalToUtc,
  formatChicagoTime,
  getChicagoParts,
  isWorkingDay,
  todayChicagoDateStr,
} from "./timezone"

export interface SlotOption {
  /** ISO UTC string */
  slotStart: string
  /** Display label e.g. "9:00 AM" */
  label: string
}

function parseDateStr(dateStr: string): { y: number; m: number; d: number } {
  const [y, m, d] = dateStr.split("-").map(Number)
  return { y, m, d }
}

function addDays(dateStr: string, days: number): string {
  const { y, m, d } = parseDateStr(dateStr)
  const dt = new Date(Date.UTC(y, m - 1, d + days))
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`
}

function countBusinessDaysBetween(fromStr: string, toStr: string): number {
  let count = 0
  let current = fromStr
  while (current < toStr) {
    current = addDays(current, 1)
    const { y, m, d } = parseDateStr(current)
    const weekday = getChicagoParts(new Date(Date.UTC(y, m - 1, d, 12))).weekday
    if (isWorkingDay(weekday)) count++
  }
  return count
}

function generateCandidateSlots(dateStr: string): Date[] {
  const { y, m, d } = parseDateStr(dateStr)
  const weekday = getChicagoParts(new Date(Date.UTC(y, m - 1, d, 12))).weekday
  if (!isWorkingDay(weekday)) return []

  const slots: Date[] = []
  const { startHour, lastSlotHour, lastSlotMinute, slotDurationMin } = schedulerConfig

  let h = startHour
  let min = 0
  const lastMinutes = lastSlotHour * 60 + lastSlotMinute

  while (h * 60 + min <= lastMinutes) {
    slots.push(chicagoLocalToUtc(dateStr, h, min))
    min += slotDurationMin
    if (min >= 60) {
      h += Math.floor(min / 60)
      min = min % 60
    }
  }

  return slots
}

export function getBookableDays(): string[] {
  const today = todayChicagoDateStr()
  const days: string[] = []

  for (let i = 0; i <= schedulerConfig.bookingHorizonDays; i++) {
    const dateStr = addDays(today, i)
    const { y, m, d } = parseDateStr(dateStr)
    const weekday = getChicagoParts(new Date(Date.UTC(y, m - 1, d, 12))).weekday

    if (!isWorkingDay(weekday)) continue

    const businessDaysOut = countBusinessDaysBetween(today, dateStr)
    if (businessDaysOut < schedulerConfig.minNoticeBusinessDays) continue

    days.push(dateStr)
  }

  return days
}

export async function getSlotsForDate(dateStr: string): Promise<SlotOption[]> {
  const bookable = getBookableDays()
  if (!bookable.includes(dateStr)) return []

  const candidates = generateCandidateSlots(dateStr)
  const now = new Date()

  const futureCandidates = candidates.filter((slot) => slot.getTime() > now.getTime())
  if (futureCandidates.length === 0) return []

  const db = getDb()
  let bookedStarts = new Set<string>()

  if (db) {
    const dayStart = chicagoLocalToUtc(dateStr, 0, 0)
    const nextDay = addDays(dateStr, 1)
    const dayEnd = chicagoLocalToUtc(nextDay, 0, 0)

    const rows = await db
      .select({ slotStart: strategyCallBookings.slotStart })
      .from(strategyCallBookings)
      .where(
        and(
          gte(strategyCallBookings.slotStart, dayStart),
          lte(strategyCallBookings.slotStart, dayEnd),
          ne(strategyCallBookings.status, "cancelled"),
        ),
      )

    bookedStarts = new Set(rows.map((r) => r.slotStart.toISOString()))
  }

  return futureCandidates
    .filter((slot) => !bookedStarts.has(slot.toISOString()))
    .map((slot) => ({
      slotStart: slot.toISOString(),
      label: formatChicagoTime(slot),
    }))
}
