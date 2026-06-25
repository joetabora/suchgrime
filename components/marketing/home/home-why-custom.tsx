"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"

export function HomeWhyCustom() {
  return (
    <section id="why" className="border-b border-white/10 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.whyCustom.label}
          title={siteConfig.homeSections.whyCustom.title}
          description="Generic software forces you to adapt. Custom systems adapt to you — saving time, reducing errors, and helping you scale without adding headcount."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {siteConfig.whyCustom.points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard>
                <h3 className="font-display text-2xl tracking-wide">{point.title}</h3>
                <p className="mt-3 text-muted">{point.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
