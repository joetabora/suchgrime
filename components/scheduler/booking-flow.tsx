"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { track } from "@vercel/analytics"
import { Calendar, Clock, CheckCircle, ArrowLeft, Loader2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { GlassCard } from "@/components/marketing/glass-card"

interface SlotOption {
  slotStart: string
  label: string
}

interface BookingFlowProps {
  bookableDays: string[]
}

type Step = "date" | "time" | "details" | "confirmed"

function formatDayLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d, 12))
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function BookingFlow({ bookableDays }: BookingFlowProps) {
  const [step, setStep] = useState<Step>("date")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<SlotOption | null>(null)
  const [slots, setSlots] = useState<SlotOption[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmedTime, setConfirmedTime] = useState<string | null>(null)

  async function selectDate(dateStr: string) {
    setSelectedDate(dateStr)
    setSelectedSlot(null)
    setLoadingSlots(true)
    setError(null)

    try {
      const res = await fetch(`/api/bookings/slots?date=${dateStr}`)
      if (!res.ok) throw new Error("Failed to load times")
      const data = await res.json()
      setSlots(data.slots)
      setStep("time")
    } catch {
      setError("Could not load available times. Please try again.")
    } finally {
      setLoadingSlots(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedSlot) return

    setSubmitting(true)
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (data.get("name") as string)?.trim(),
          email: (data.get("email") as string)?.trim(),
          company: (data.get("company") as string)?.trim() || undefined,
          phone: (data.get("phone") as string)?.trim() || undefined,
          projectType: (data.get("projectType") as string) || undefined,
          notes: (data.get("notes") as string)?.trim() || undefined,
          slotStart: selectedSlot.slotStart,
          website: (data.get("website") as string) || "",
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error ?? "Booking failed. Please try another time.")
        if (res.status === 409 && selectedDate) {
          await selectDate(selectedDate)
          setStep("time")
        }
        return
      }

      setConfirmedTime(result.booking?.formatted ?? selectedSlot.label)
      setStep("confirmed")
      track("booking_completed", { projectType: (data.get("projectType") as string) || "unspecified" })
      form.reset()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (step === "confirmed") {
    return (
      <GlassCard className="mx-auto max-w-lg p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-tech" />
        <h2 className="mt-4 font-display text-3xl tracking-wide">You&apos;re Booked</h2>
        <p className="mt-3 text-muted">
          Your strategy call is confirmed for{" "}
          <span className="text-text">{confirmedTime}</span>.
        </p>
        <p className="mt-2 text-sm text-muted">
          Check your email for confirmation. We&apos;ll discuss your workflows, bottlenecks, and what custom systems could look like for your business.
        </p>
      </GlassCard>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-3">
        {step !== "date" && (
          <button
            type="button"
            onClick={() => {
              if (step === "details") setStep("time")
              else if (step === "time") {
                setStep("date")
                setSelectedDate(null)
                setSlots([])
              }
            }}
            className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-tech"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        <div className="flex gap-2">
          {(["date", "time", "details"] as const).map((s, i) => (
            <span
              key={s}
              className={`h-1 w-12 rounded-full ${
                (step === "date" && i === 0) ||
                (step === "time" && i <= 1) ||
                (step === "details" && i <= 2)
                  ? "bg-tech"
                  : "bg-white/10"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "date" && (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="mb-4 flex items-center gap-2 text-tech">
              <Calendar className="h-5 w-5" />
              <h2 className="font-display text-2xl tracking-wide">Pick a Day</h2>
            </div>
            <p className="mb-6 text-sm text-muted">
              30-minute strategy calls · Mon–Fri · Central Time
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {bookableDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  disabled={loadingSlots && selectedDate === day}
                  onClick={() => selectDate(day)}
                  className="glass glass-border rounded-lg border px-4 py-3 text-left transition-colors hover:border-tech/40 disabled:opacity-50"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {day}
                  </span>
                  <span className="mt-1 block font-medium text-text">{formatDayLabel(day)}</span>
                </button>
              ))}
            </div>
            {loadingSlots && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading times…
              </p>
            )}
          </motion.div>
        )}

        {step === "time" && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="mb-4 flex items-center gap-2 text-tech">
              <Clock className="h-5 w-5" />
              <h2 className="font-display text-2xl tracking-wide">Pick a Time</h2>
            </div>
            <p className="mb-6 text-sm text-muted">
              {selectedDate && formatDayLabel(selectedDate)} · Central Time
            </p>
            {slots.length === 0 ? (
              <p className="text-muted">No times available this day. Pick another date.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.slotStart}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot)
                      setStep("details")
                    }}
                    className={`rounded-lg border px-4 py-3 font-mono text-sm transition-colors ${
                      selectedSlot?.slotStart === slot.slotStart
                        ? "border-tech bg-tech/10 text-tech"
                        : "glass glass-border hover:border-tech/40"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === "details" && selectedSlot && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <h2 className="font-display text-2xl tracking-wide">Your Details</h2>
            <p className="mt-2 mb-6 text-sm text-muted">
              {selectedDate && formatDayLabel(selectedDate)} at {selectedSlot.label} CT
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] opacity-0"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="booking-name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Name *
                </label>
                <input
                  id="booking-name"
                  name="name"
                  required
                  className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="booking-email" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Email *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-company" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                    Company
                  </label>
                  <input
                    id="booking-company"
                    name="company"
                    className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                    Phone
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-type" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  What are you looking to build?
                </label>
                <select
                  id="booking-type"
                  name="projectType"
                  className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>Select a type</option>
                  {siteConfig.contact.projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="booking-notes" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Anything else we should know?
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-text focus:border-tech focus:outline-none"
                  placeholder="Current workflows, pain points, timeline…"
                />
              </div>

              {error && <p className="text-sm text-parlor-accent">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-parlor-accent py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80 disabled:opacity-50"
              >
                {submitting ? "Booking…" : siteConfig.primaryCta}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {error && step === "date" && <p className="mt-4 text-sm text-parlor-accent">{error}</p>}
    </div>
  )
}
