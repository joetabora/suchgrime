"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"

export function HomeSpreadsheet() {
  return (
    <section className="border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label="Replace The Spreadsheet"
          title="Your Business Deserves Better Than Duct Tape"
          description="Most businesses operate critical functions using spreadsheets, emails, sticky notes, and disconnected software. We replace that chaos with systems built for how you actually work."
        />

        <div className="mt-16 space-y-8">
          {siteConfig.spreadsheetSystems.map((system, i) => (
            <motion.div
              key={system.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass glass-border rounded-lg border p-6 backdrop-blur-sm"
            >
              <p className="mb-4 font-display text-xl tracking-wide text-text md:text-2xl">
                {system.label}
              </p>
              <WorkflowDiagram
                nodes={[
                  { label: system.from, variant: "muted" },
                  { label: system.to, variant: "accent" },
                ]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
