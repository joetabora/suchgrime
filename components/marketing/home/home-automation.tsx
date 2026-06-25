"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeAutomation() {
  return (
    <section className="border-b border-white/8 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.automation.label}
          title={siteConfig.homeSections.automation.title}
          description={siteConfig.homeSections.automation.description}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {siteConfig.automationExamples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={staggerDelay(i)}
            >
              <GlassCard variant="pressed" className="h-full">
                <h3 className="display-heading text-xl text-text">{example.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{example.description}</p>
                <div className="mt-6">
                  <WorkflowDiagram nodes={example.nodes} direction="vertical" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
