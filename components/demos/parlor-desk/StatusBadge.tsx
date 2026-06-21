"use client"
import type { AppointmentStatus } from "@/lib/demos/booking-desk"

const styles: Record<AppointmentStatus, string> = {
  confirmed: "bg-desk-success/15 text-desk-success border-desk-success/30",
  pending: "bg-desk-warn/15 text-desk-warn border-desk-warn/30",
  cancelled: "bg-desk-danger/15 text-desk-danger border-desk-danger/30",
}

const labels: Record<AppointmentStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
}

interface StatusBadgeProps {
  status: AppointmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
