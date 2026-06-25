"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"

export function HomeAutomation() {
  return (
    <section className="border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label="Automation Examples"
          title="Workflows That Run While You Sleep"
          description="Connected systems that route leads, sync data, trigger follow-ups, and deliver reports — without manual intervention."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {siteConfig.automationExamples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="h-full">
                <h3 className="font-display text-xl tracking-wide">{example.title}</h3>
                <p className="mt-2 text-sm text-muted">{example.description}</p>
                <div className="mt-6">
                  <WorkflowDiagram
                    nodes={example.nodes}
                    direction="vertical"
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
