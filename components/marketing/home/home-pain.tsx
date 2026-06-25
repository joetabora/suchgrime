"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { staggerDelay } from "@/components/marketing/motion"

export function HomePain() {
  return (
    <section className="poster-section border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.pain.label}
          title={siteConfig.homeSections.pain.title}
          description={siteConfig.homeSections.pain.description}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.painPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={staggerDelay(i)}
            >
              <GlassCard className="h-full">
                <p className="text-sm leading-relaxed text-muted md:text-base">{point}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={staggerDelay(0)}
          className="mt-16 border border-parlor-accent/30 bg-parlor-accent/10 px-8 py-10 text-center"
        >
          <p className="font-display text-3xl tracking-wide text-text md:text-4xl">
            {siteConfig.homeSections.pain.closingLine}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
