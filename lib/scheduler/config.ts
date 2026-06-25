/** Strategy call scheduler — single source of truth for availability rules */
export const schedulerConfig = {
  timezone: "America/Chicago",
  /** 0 = Sunday, 1 = Monday, … */
  workingDays: [1, 2, 3, 4, 5] as const,
  startHour: 9,
  /** Last slot starts at this hour (30-min slots → ends at 4:30 PM) */
  lastSlotHour: 15,
  lastSlotMinute: 30,
  slotDurationMin: 30,
  /** How many calendar days ahead clients can book */
  bookingHorizonDays: 21,
  /** Minimum business days of notice (1 = earliest slot is tomorrow if working day) */
  minNoticeBusinessDays: 1,
} as const

export type BookingStatus = "pending" | "confirmed" | "cancelled"
