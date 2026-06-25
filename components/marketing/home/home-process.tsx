"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"

export function HomeProcess() {
  const processNodes = siteConfig.process.map((step) => step.title)

  return (
    <section className="border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.process.label}
          title={siteConfig.homeSections.process.title}
          description={siteConfig.homeSections.process.description}
        />

        <div className="mt-12 hidden lg:block">
          <WorkflowDiagram nodes={processNodes} />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard variant="steel" className="h-full">
                <span className="font-mono text-sm text-purple">{step.step}</span>
                <h3 className="mt-2 font-display text-2xl tracking-wide">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
