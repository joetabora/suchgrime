"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeSpreadsheet() {
  return (
    <section className="poster-section border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.spreadsheet.label}
          title={siteConfig.homeSections.spreadsheet.title}
          description={siteConfig.homeSections.spreadsheet.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {siteConfig.spreadsheetSystems.map((system, i) => (
            <motion.div
              key={system.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={staggerDelay(i)}
            >
              <GlassCard>
                <p className="text-label mb-4">{system.label}</p>
                <WorkflowDiagram
                  nodes={[
                    { label: system.from, variant: "muted" },
                    { label: system.to, variant: "accent" },
                  ]}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
