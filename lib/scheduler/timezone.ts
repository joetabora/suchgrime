import { schedulerConfig } from "./config"

interface ChicagoParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  weekday: number
}

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: schedulerConfig.timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  weekday: "short",
})

const weekdayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function getChicagoParts(date: Date): ChicagoParts {
  const parts = formatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  const hourRaw = parseInt(get("hour"), 10)
  return {
    year: parseInt(get("year"), 10),
    month: parseInt(get("month"), 10),
    day: parseInt(get("day"), 10),
    hour: hourRaw === 24 ? 0 : hourRaw,
    minute: parseInt(get("minute"), 10),
    weekday: weekdayMap[get("weekday")] ?? 0,
  }
}

/** Convert a Chicago-local date/time to a UTC Date for storage */
export function chicagoLocalToUtc(dateStr: string, hour: number, minute: number): Date {
  const [y, m, d] = dateStr.split("-").map(Number)
  let candidate = new Date(Date.UTC(y, m - 1, d, hour + 6, minute))

  for (let i = 0; i < 48; i++) {
    const parts = getChicagoParts(candidate)
    const targetMinutes = hour * 60 + minute
    const actualMinutes = parts.hour * 60 + parts.minute
    const dayDiff = d - parts.day

    if (
      parts.year === y &&
      parts.month === m &&
      parts.day === d &&
      actualMinutes === targetMinutes
    ) {
      return candidate
    }

    const adjustMinutes = targetMinutes - actualMinutes + dayDiff * 24 * 60
    candidate = new Date(candidate.getTime() + adjustMinutes * 60 * 1000)
  }

  return candidate
}

export function formatChicagoDate(date: Date): string {
  const parts = getChicagoParts(date)
  const y = parts.year
  const m = String(parts.month).padStart(2, "0")
  const d = String(parts.day).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function formatChicagoTime(date: Date): string {
  const parts = getChicagoParts(date)
  const h = parts.hour
  const m = parts.minute
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`
}

export function formatChicagoDateTime(date: Date): string {
  const parts = getChicagoParts(date)
  const dateStr = `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`
  return `${dateStr} at ${formatChicagoTime(date)} CT`
}

export function todayChicagoDateStr(): string {
  return formatChicagoDate(new Date())
}

export function isWorkingDay(weekday: number): boolean {
  return (schedulerConfig.workingDays as readonly number[]).includes(weekday)
}
