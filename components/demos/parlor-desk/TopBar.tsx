"use client"
import { Plus } from "lucide-react"

interface TopBarProps {
  title: string
  showNewButton?: boolean
  onNewAppointment?: () => void
}

export function TopBar({ title, showNewButton = true, onNewAppointment }: TopBarProps) {
  return (
    <header className="sticky top-9 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-bg/95 px-6 backdrop-blur-sm">
      <h1 className="text-lg font-semibold text-text">{title}</h1>
      {showNewButton && onNewAppointment && (
        <button
          type="button"
          onClick={onNewAppointment}
          className="inline-flex items-center gap-2 rounded-md bg-desk-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-desk-accent/90"
        >
          <Plus className="h-4 w-4" />
          New Appointment
        </button>
      )}
    </header>
  )
}
