"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"

export function ParlorProcess() {
  return (
    <section id="process" className="poster-section bg-bg-elevated">
      <div className="border-b border-white/10 px-6 py-12 md:px-12">
        <p className="text-label mb-2">Process</p>
        <h2 className="font-display text-6xl tracking-wide md:text-8xl">HOW WE WORK</h2>
      </div>

      <div className="mx-auto grid max-w-[1400px] border-x border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`border-b border-white/10 p-6 md:p-8 ${
              i < siteConfig.process.length - 1 ? "lg:border-r" : ""
            } ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "sm:border-b lg:border-b-0" : ""}`}
          >
            <span className="font-display text-5xl text-parlor-accent md:text-6xl">{step.step}</span>
            <h3 className="mt-4 font-display text-3xl tracking-wide">{step.title.toUpperCase()}</h3>
            <p className="mt-3 text-sm text-muted">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
