"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeWhyCustom() {
  return (
    <section id="why" className="border-b border-white/8 bg-bg-elevated py-24 md:py-32 halftone">
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
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
              transition={staggerDelay(i)}
            >
              <GlassCard variant="pressed">
                <h3 className="display-heading text-2xl text-text">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{point.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
