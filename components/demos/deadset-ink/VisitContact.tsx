"use client"
import { type FormEvent, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"
import { studio } from "@/lib/demos/studio"

export function VisitContact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get("name") as string)?.trim()
    const phone = (data.get("phone") as string)?.trim()

    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = "Name is required"
    if (!phone) newErrors.phone = "Phone is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="visit" className="relative bg-bg-elevated">
      <div className="grid lg:grid-cols-2">
        <div id="contact" className="order-2 px-6 py-24 md:px-12 md:py-32 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-neon">
              Book
            </p>
            <h2 className="font-ink-display text-5xl font-bold uppercase tracking-tight md:text-6xl">
              Get in
              <br />
              the chair
            </h2>
            <p className="mt-4 max-w-md text-muted">
              {studio.location.note}. Tell us your idea — we&apos;ll schedule a consult.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div>
                <label htmlFor="ink-name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Name
                </label>
                <input
                  id="ink-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-ink-accent focus:outline-none"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-ink-accent">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="ink-phone" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Phone
                </label>
                <input
                  id="ink-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-ink-accent focus:outline-none"
                  placeholder="(555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-ink-accent">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="ink-placement" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Placement
                </label>
                <input
                  id="ink-placement"
                  name="placement"
                  type="text"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-ink-accent focus:outline-none"
                  placeholder="Forearm, back, chest..."
                />
              </div>

              <div>
                <label htmlFor="ink-idea" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
                  Your Idea
                </label>
                <textarea
                  id="ink-idea"
                  name="idea"
                  rows={3}
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-ink-accent focus:outline-none"
                  placeholder="Style, size, references..."
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-ink-accent py-4 font-ink-display text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:bg-ink-accent-hover"
              >
                Request Consult
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 flex items-center gap-2 border border-ink-accent/30 bg-ink-accent/10 px-4 py-3 text-sm"
                  role="status"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-ink-accent" />
                  Thanks! We&apos;ll reach out to schedule your consult.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="relative order-1 min-h-[400px] lg:order-2 lg:min-h-0">
          <iframe
            title="Deadset Ink location map"
            src={studio.location.mapEmbed}
            className="absolute inset-0 h-full w-full grayscale invert lg:sticky lg:top-9 lg:h-[calc(100vh-2.25rem)]"
            loading="lazy"
          />

          <div className="relative z-10 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/80 to-transparent p-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-bg lg:via-bg/90 lg:to-transparent lg:p-12">
            <div className="space-y-4 border border-white/10 bg-bg/80 p-6 backdrop-blur-md md:max-w-md">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-accent" />
                <div>
                  <p className="font-ink-display text-lg uppercase">{studio.location.address}</p>
                  <p className="text-sm text-muted">{studio.location.city}</p>
                </div>
              </div>
              <a
                href={`tel:${studio.location.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-ink-accent"
              >
                <Phone className="h-4 w-4 text-ink-accent" />
                {studio.location.phone}
              </a>
              <div className="border-t border-white/10 pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ink-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">Hours</span>
                </div>
                <dl className="space-y-1">
                  {studio.location.hours.map((row) => (
                    <div key={row.day} className="flex justify-between text-xs">
                      <dt className="text-muted">{row.day}</dt>
                      <dd>{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
