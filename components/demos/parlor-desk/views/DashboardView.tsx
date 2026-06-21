"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { useBookingStore } from "@/hooks/useBookingStore"
import { StatCard } from "../StatCard"
import { StatusBadge } from "../StatusBadge"

export function DashboardView() {
  const { stats, todayUpcoming, openModal } = useBookingStore()

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Appointments" value={stats.todayCount} />
        <StatCard label="Pending Confirmation" value={stats.pendingCount} />
        <StatCard label="This Week" value={stats.weekCount} />
        <StatCard label="Total Clients" value={stats.clientCount} />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text">Upcoming Today</h2>
          <button
            type="button"
            onClick={() => openModal()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-desk-accent transition-colors hover:text-desk-accent/80"
          >
            <Plus className="h-3.5 w-3.5" />
            Add appointment
          </button>
        </div>

        {todayUpcoming.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/15 p-8 text-center">
            <p className="text-sm text-muted">No appointments scheduled for today.</p>
            <button
              type="button"
              onClick={() => openModal()}
              className="mt-3 text-sm font-medium text-desk-accent hover:underline"
            >
              Schedule one now
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-surface text-left">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Time</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Client</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Service</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayUpcoming.map((apt) => (
                  <tr key={apt.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 tabular-nums text-text">{apt.time}</td>
                    <td className="px-4 py-3 text-text">{apt.clientName}</td>
                    <td className="px-4 py-3 text-muted">{apt.service}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={apt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-muted">
        View all{" "}
        <Link href="/work/parlor-desk/appointments" className="text-desk-accent hover:underline">
          appointments
        </Link>{" "}
        or browse your{" "}
        <Link href="/work/parlor-desk/clients" className="text-desk-accent hover:underline">
          client list
        </Link>
        .
      </p>
    </div>
  )
}
