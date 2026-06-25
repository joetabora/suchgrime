"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"

export function HomeSpreadsheet() {
  return (
    <section className="relative border-b border-white/10 py-24 md:py-32">
      <div className="absolute inset-0 blueprint-grid opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.spreadsheet.label}
          title={siteConfig.homeSections.spreadsheet.title}
          description={siteConfig.homeSections.spreadsheet.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {siteConfig.spreadsheetSystems.map((system, i) => (
            <motion.div
              key={system.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlassCard variant="steel">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-purple/70">
                  {system.label}
                </p>
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
