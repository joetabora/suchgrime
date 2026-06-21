"use client"
import { motion } from "framer-motion"
import { Clock, MapPin, Phone } from "lucide-react"
import { shop } from "@/lib/demos/shop"

export function Location() {
  return (
    <section id="visit" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-label mb-3">// Visit</p>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            FIND US
          </h2>
          <p className="mt-4 text-muted">{shop.location.note}</p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 border border-white/5 bg-surface p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="font-medium">{shop.location.address}</p>
                <p className="text-muted">{shop.location.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border border-white/5 bg-surface p-6">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <a
                href={`tel:${shop.location.phone.replace(/\D/g, "")}`}
                className="font-medium transition-colors hover:text-accent"
              >
                {shop.location.phone}
              </a>
            </div>

            <div className="border border-white/5 bg-surface p-6">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <p className="font-medium">Hours</p>
              </div>
              <dl className="space-y-2">
                {shop.location.hours.map((row) => (
                  <div key={row.day} className="flex justify-between text-sm">
                    <dt className="text-muted">{row.day}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden border border-white/5 bg-surface"
          >
            <iframe
              title="Block & Blade location map"
              src={shop.location.mapEmbed}
              className="h-full min-h-[320px] w-full grayscale invert"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
