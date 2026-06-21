"use client"

import Link from "next/link"
import { CalendarDays, LayoutDashboard, Users } from "lucide-react"
import { desk } from "@/lib/demos/booking-desk"

const navItems = [
  { to: "/work/parlor-desk", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/work/parlor-desk/appointments", label: "Appointments", icon: CalendarDays, end: false },
  { to: "/work/parlor-desk/clients", label: "Clients", icon: Users, end: false },
]

interface SidebarProps {
  pathname: string
}

export function Sidebar({ pathname }: SidebarProps) {
  return (
    <aside className="fixed bottom-0 left-0 top-9 z-40 flex w-60 flex-col border-r border-white/10 bg-desk-sidebar">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="font-semibold text-text">{desk.name}</p>
        <p className="mt-0.5 text-xs italic text-muted">{desk.tagline}</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = to === "/work/parlor-desk" ? pathname === to : pathname.startsWith(to)
          return (
            <Link
              key={to}
              href={to}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-desk-accent/15 font-medium text-desk-accent"
                  : "text-muted hover:bg-white/5 hover:text-text"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Powered by SuchGrime</p>
      </div>
    </aside>
  )
}
