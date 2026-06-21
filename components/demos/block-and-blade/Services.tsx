"use client"
import { motion } from "framer-motion"
import { Clock, Scissors } from "lucide-react"
import { shop } from "@/lib/demos/shop"

export function Services() {
  return (
    <section id="services" className="bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-label mb-3">{"// Services"}</p>
          <h2 className="font-display text-5xl tracking-wide md:text-6xl">
            THE MENU
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Quality work at fair prices. Every service includes a consultation
            and finish with product.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shop.services.map((service, i) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group border border-white/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(232,93,4,0.12)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <Scissors className="h-5 w-5 text-accent" />
                <span className="font-display text-2xl text-gold">${service.price}</span>
              </div>
              <h3 className="font-display text-2xl tracking-wide">{service.name}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" />
                {service.duration}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
