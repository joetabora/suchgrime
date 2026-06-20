import { useEffect, useState, type FormEvent } from "react"
import { X } from "lucide-react"
import type { Appointment, AppointmentStatus } from "../../data/booking-desk"
import { desk } from "../../data/booking-desk"

interface AppointmentModalProps {
  open: boolean
  appointment: Appointment | null
  onClose: () => void
  onSave: (data: Omit<Appointment, "id">) => void
}

const emptyForm: Omit<Appointment, "id"> = {
  clientName: "",
  phone: "",
  service: desk.services[0],
  date: new Date().toISOString().split("T")[0],
  time: desk.timeSlots[1],
  status: "pending",
  notes: "",
}

export function AppointmentModal({ open, appointment, onClose, onSave }: AppointmentModalProps) {
  const [form, setForm] = useState<Omit<Appointment, "id">>(emptyForm)

  useEffect(() => {
    if (open) {
      setForm(
        appointment
          ? {
              clientName: appointment.clientName,
              phone: appointment.phone,
              service: appointment.service,
              date: appointment.date,
              time: appointment.time,
              status: appointment.status,
              notes: appointment.notes ?? "",
            }
          : emptyForm,
      )
    }
  }, [open, appointment])

  if (!open) return null

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-lg border border-white/10 bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-text">
            {appointment ? "Edit Appointment" : "New Appointment"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted transition-colors hover:bg-white/5 hover:text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Client name</span>
            <input
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Phone</span>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Service</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
            >
              {desk.services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Date</span>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Time</span>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
              >
                {desk.timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Status</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as AppointmentStatus })}
              className="w-full rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Notes</span>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full resize-none rounded-md border border-white/10 bg-bg px-3 py-2 text-sm text-text outline-none focus:border-desk-accent"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-desk-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-desk-accent/90"
            >
              {appointment ? "Save Changes" : "Add Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
