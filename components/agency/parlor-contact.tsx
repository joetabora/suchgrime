"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

interface ContactFormProps {
  idPrefix?: string
}

export function ContactForm({ idPrefix = "parlor" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get("name") as string)?.trim()
    const email = (data.get("email") as string)?.trim()

    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = "Name is required"
    if (!email) newErrors.email = "Email is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType: data.get("projectType"),
          message: data.get("message"),
        }),
      })
      setSubmitted(true)
      form.reset()
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className="w-full border-b-2 border-white/15 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-parlor-accent focus:outline-none"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-sm text-parlor-accent">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="w-full border-b-2 border-white/15 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-parlor-accent focus:outline-none"
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1 text-sm text-parlor-accent">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-type`} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
            Project Type
          </label>
          <select
            id={`${idPrefix}-type`}
            name="projectType"
            className="w-full border-b-2 border-white/15 bg-transparent py-3 text-text focus:border-parlor-accent focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select a type
            </option>
            {siteConfig.contact.projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted">
            Message
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={4}
            className="w-full resize-none border-b-2 border-white/15 bg-transparent py-3 text-text placeholder:text-muted/40 focus:border-parlor-accent focus:outline-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {errors.form && <p className="text-sm text-parlor-accent">{errors.form}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-parlor-accent bg-parlor-accent py-4 font-display text-2xl tracking-wider text-text transition-colors hover:bg-transparent hover:text-parlor-accent disabled:opacity-50"
        >
          {loading ? "SENDING..." : "SEND INQUIRY"}
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 flex items-center gap-2 border border-parlor-accent/30 bg-parlor-accent/10 px-4 py-3 text-sm"
            role="status"
          >
            <CheckCircle className="h-5 w-5 shrink-0 text-parlor-accent" />
            Thanks! We&apos;ll be in touch within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function ParlorContact() {
  return (
    <section id="contact" className="border-t-4 border-parlor-accent bg-bg">
      <div className="mx-auto grid max-w-[1400px] border-x border-white/10 lg:grid-cols-2">
        <div className="border-b border-white/10 p-6 md:p-12 lg:border-b-0 lg:border-r">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-label mb-4">{siteConfig.contact.note}</p>
            <h2 className="font-display text-5xl leading-[0.9] tracking-wide md:text-7xl lg:text-8xl">
              START
              <br />A PROJECT
            </h2>
            <p className="mt-6 max-w-md text-muted">
              Tell us about your brand, your goals, and the systems you need built.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-parlor-accent transition-colors hover:text-parlor-accent/80"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.contact.email}
            </a>
          </motion.div>
        </div>

        <div className="p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
