import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  type Appointment,
  type ClientSummary,
  STORAGE_KEY,
  createSeedAppointments,
  endOfWeekISO,
  parseTimeToMinutes,
  todayISO,
} from "../data/booking-desk"

interface BookingStoreContextValue {
  appointments: Appointment[]
  clients: ClientSummary[]
  stats: {
    todayCount: number
    pendingCount: number
    weekCount: number
    clientCount: number
  }
  todayUpcoming: Appointment[]
  modalOpen: boolean
  editingAppointment: Appointment | null
  addAppointment: (data: Omit<Appointment, "id">) => void
  updateAppointment: (id: string, data: Omit<Appointment, "id">) => void
  cancelAppointment: (id: string) => void
  deleteAppointment: (id: string) => void
  openModal: (appointment?: Appointment) => void
  closeModal: () => void
}

const BookingStoreContext = createContext<BookingStoreContextValue | null>(null)

function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Appointment[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* use seed */
  }
  return createSeedAppointments()
}

function deriveClients(appointments: Appointment[]): ClientSummary[] {
  const map = new Map<string, ClientSummary>()
  const today = todayISO()

  for (const apt of appointments) {
    if (apt.status === "cancelled") continue
    const key = `${apt.clientName}|${apt.phone}`
    const existing = map.get(key)
    if (!existing) {
      map.set(key, {
        key,
        clientName: apt.clientName,
        phone: apt.phone,
        totalVisits: 1,
        lastVisit: apt.date,
        upcoming: apt.date >= today ? `${apt.date} ${apt.time}` : null,
      })
    } else {
      existing.totalVisits += 1
      if (apt.date > existing.lastVisit) existing.lastVisit = apt.date
      if (apt.date >= today) {
        const upcoming = `${apt.date} ${apt.time}`
        if (!existing.upcoming || apt.date < existing.upcoming.split(" ")[0]) {
          existing.upcoming = upcoming
        }
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.clientName.localeCompare(b.clientName))
}

export function BookingStoreProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  }, [appointments])

  const today = todayISO()
  const weekEnd = endOfWeekISO()

  const stats = useMemo(() => {
    const active = appointments.filter((a) => a.status !== "cancelled")
    return {
      todayCount: active.filter((a) => a.date === today).length,
      pendingCount: appointments.filter((a) => a.status === "pending").length,
      weekCount: active.filter((a) => a.date >= today && a.date <= weekEnd).length,
      clientCount: deriveClients(appointments).length,
    }
  }, [appointments, today, weekEnd])

  const todayUpcoming = useMemo(() => {
    return appointments
      .filter((a) => a.date === today && a.status !== "cancelled")
      .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
      .slice(0, 5)
  }, [appointments, today])

  const clients = useMemo(() => deriveClients(appointments), [appointments])

  const addAppointment = useCallback((data: Omit<Appointment, "id">) => {
    setAppointments((prev) => [...prev, { ...data, id: `apt-${Date.now()}` }])
  }, [])

  const updateAppointment = useCallback((id: string, data: Omit<Appointment, "id">) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...data, id } : a)))
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a)),
    )
  }, [])

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const openModal = useCallback((appointment?: Appointment) => {
    setEditingAppointment(appointment ?? null)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingAppointment(null)
  }, [])

  return (
    <BookingStoreContext.Provider
      value={{
        appointments,
        clients,
        stats,
        todayUpcoming,
        modalOpen,
        editingAppointment,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        deleteAppointment,
        openModal,
        closeModal,
      }}
    >
      {children}
    </BookingStoreContext.Provider>
  )
}

export function useBookingStore() {
  const ctx = useContext(BookingStoreContext)
  if (!ctx) throw new Error("useBookingStore must be used within BookingStoreProvider")
  return ctx
}
