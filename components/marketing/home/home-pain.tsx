"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"

export function HomePain() {
  return (
    <section className="relative border-b border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.pain.label}
          title={siteConfig.homeSections.pain.title}
          description={siteConfig.homeSections.pain.description}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.painPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard variant="steel" className="h-full">
                <p className="text-sm leading-relaxed text-muted md:text-base">{point}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border border-purple/30 bg-purple/5 px-8 py-10 text-center backdrop-blur-sm"
        >
          <p className="font-display text-3xl tracking-wide text-text md:text-4xl">
            {siteConfig.homeSections.pain.closingLine}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
