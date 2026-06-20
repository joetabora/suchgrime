export type AppointmentStatus = "confirmed" | "pending" | "cancelled"

export interface Appointment {
  id: string
  clientName: string
  phone: string
  service: string
  date: string
  time: string
  status: AppointmentStatus
  notes?: string
}

export interface ClientSummary {
  key: string
  clientName: string
  phone: string
  totalVisits: number
  lastVisit: string
  upcoming: string | null
}

export const STORAGE_KEY = "parlor-desk-appointments"

export const desk = {
  name: "Parlor Desk",
  tagline: "Bookings, handled.",
  services: [
    "Classic Cut",
    "Skin Fade",
    "Beard Sculpt",
    "Consultation",
    "Tattoo Session",
    "Cover-Up Consult",
    "Kids Cut",
  ],
  timeSlots: [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ],
} as const

function formatDateOffset(daysFromToday: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromToday)
  return d.toISOString().split("T")[0]
}

export function createSeedAppointments(): Appointment[] {
  return [
    {
      id: "apt-1",
      clientName: "Marcus Rivera",
      phone: "(555) 234-8891",
      service: "Skin Fade",
      date: formatDateOffset(0),
      time: "10:00 AM",
      status: "confirmed",
      notes: "Regular — low fade",
    },
    {
      id: "apt-2",
      clientName: "Jaylen Ortiz",
      phone: "(555) 882-4410",
      service: "Classic Cut",
      date: formatDateOffset(0),
      time: "2:00 PM",
      status: "pending",
    },
    {
      id: "apt-3",
      clientName: "Aisha Thompson",
      phone: "(555) 441-2200",
      service: "Kids Cut",
      date: formatDateOffset(1),
      time: "11:00 AM",
      status: "confirmed",
    },
    {
      id: "apt-4",
      clientName: "Vince Knox",
      phone: "(555) 990-1122",
      service: "Tattoo Session",
      date: formatDateOffset(1),
      time: "1:00 PM",
      status: "pending",
      notes: "Half sleeve consult first",
    },
    {
      id: "apt-5",
      clientName: "Zara Martinez",
      phone: "(555) 667-3301",
      service: "Consultation",
      date: formatDateOffset(2),
      time: "3:00 PM",
      status: "confirmed",
    },
    {
      id: "apt-6",
      clientName: "Dre Williams",
      phone: "(555) 778-0099",
      service: "Cover-Up Consult",
      date: formatDateOffset(3),
      time: "4:00 PM",
      status: "cancelled",
    },
    {
      id: "apt-7",
      clientName: "Marcus Rivera",
      phone: "(555) 234-8891",
      service: "Beard Sculpt",
      date: formatDateOffset(5),
      time: "10:00 AM",
      status: "pending",
    },
    {
      id: "apt-8",
      clientName: "Rico Hahn",
      phone: "(555) 321-5544",
      service: "Tattoo Session",
      date: formatDateOffset(6),
      time: "12:00 PM",
      status: "confirmed",
      notes: "Full day block",
    },
  ]
}

export function parseTimeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const period = match[3].toUpperCase()
  if (period === "PM" && hours !== 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0
  return hours * 60 + minutes
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0]
}

export function endOfWeekISO(): string {
  const d = new Date()
  const day = d.getDay()
  const diff = 7 - day
  d.setDate(d.getDate() + diff)
  return d.toISOString().split("T")[0]
}
