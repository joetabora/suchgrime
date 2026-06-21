"use client"
import { useBookingStore } from "@/hooks/useBookingStore"

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function ClientsView() {
  const { clients } = useBookingStore()

  if (clients.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/15 p-12 text-center">
        <p className="text-sm text-muted">
          No clients yet — they appear automatically from appointments.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-surface text-left">
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
              Name
            </th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
              Phone
            </th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
              Total Visits
            </th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
              Last Visit
            </th>
            <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
              Upcoming
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.key} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-3 font-medium text-text">{client.clientName}</td>
              <td className="px-4 py-3 text-muted">{client.phone}</td>
              <td className="px-4 py-3 tabular-nums text-text">{client.totalVisits}</td>
              <td className="px-4 py-3 text-text">{formatDate(client.lastVisit)}</td>
              <td className="px-4 py-3 text-muted">{client.upcoming ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
