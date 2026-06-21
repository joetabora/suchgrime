"use client"
import { useMemo, useState } from "react"
import { Pencil, Trash2, XCircle } from "lucide-react"
import type { AppointmentStatus } from "@/lib/demos/booking-desk"
import { useBookingStore } from "@/hooks/useBookingStore"
import { StatusBadge } from "../StatusBadge"

type FilterTab = "all" | AppointmentStatus

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
]

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00")
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function AppointmentsView() {
  const { appointments, openModal, cancelAppointment, deleteAppointment } = useBookingStore()
  const [filter, setFilter] = useState<FilterTab>("all")

  const filtered = useMemo(() => {
    const list =
      filter === "all" ? appointments : appointments.filter((a) => a.status === filter)
    return [...list].sort((a, b) => {
      const dateCmp = a.date.localeCompare(b.date)
      if (dateCmp !== 0) return dateCmp
      return a.time.localeCompare(b.time)
    })
  }, [appointments, filter])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              filter === key
                ? "bg-desk-accent/15 text-desk-accent"
                : "text-muted hover:bg-white/5 hover:text-text"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-muted">
            {filter === "all"
              ? "No appointments yet."
              : `No ${filter} appointments.`}
          </p>
          <button
            type="button"
            onClick={() => openModal()}
            className="mt-3 text-sm font-medium text-desk-accent hover:underline"
          >
            Add an appointment
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-surface text-left">
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Client
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Service
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Date
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Time
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text">{apt.clientName}</p>
                    <p className="text-xs text-muted">{apt.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-muted">{apt.service}</td>
                  <td className="px-4 py-3 text-text">{formatDate(apt.date)}</td>
                  <td className="px-4 py-3 tabular-nums text-text">{apt.time}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => openModal(apt)}
                        className="rounded p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-desk-accent"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {apt.status !== "cancelled" && (
                        <button
                          type="button"
                          title="Cancel"
                          onClick={() => cancelAppointment(apt.id)}
                          className="rounded p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-desk-warn"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => {
                          if (window.confirm("Permanently delete this appointment?")) {
                            deleteAppointment(apt.id)
                          }
                        }}
                        className="rounded p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-desk-danger"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
