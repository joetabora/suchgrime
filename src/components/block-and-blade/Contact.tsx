import { type FormEvent, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Phone } from "lucide-react"
import { shop } from "../../data/shop"

export function Contact() {
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
    <section id="contact" className="bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-label mb-3">// Book</p>
            <h2 className="font-display text-5xl tracking-wide md:text-6xl">
              GET IN THE CHAIR
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Send us a message and we'll get back to you within a few hours.
              Prefer to call? We're here.
            </p>
            <a
              href={`tel:${shop.location.phone.replace(/\D/g, "")}`}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-accent transition-colors hover:text-accent-hover"
            >
              <Phone className="h-5 w-5" />
              {shop.location.phone}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 border border-white/5 bg-surface p-8"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full border border-white/10 bg-bg px-4 py-3 text-text placeholder:text-muted/50 focus:border-accent"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-accent">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full border border-white/10 bg-bg px-4 py-3 text-text placeholder:text-muted/50 focus:border-accent"
                  placeholder="(555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-accent">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
                  Preferred Service
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full border border-white/10 bg-bg px-4 py-3 text-text focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {shop.services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} — ${s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full resize-none border border-white/10 bg-bg px-4 py-3 text-text placeholder:text-muted/50 focus:border-accent"
                  placeholder="Preferred day/time, any notes..."
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-11 bg-accent py-3 text-sm font-semibold uppercase tracking-wider text-bg transition-colors hover:bg-accent-hover"
              >
                Request Appointment
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 flex items-center gap-2 border border-accent/30 bg-accent/10 px-4 py-3 text-sm"
                  role="status"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                  Thanks! We'll be in touch soon to confirm your appointment.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
