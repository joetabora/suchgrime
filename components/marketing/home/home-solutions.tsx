"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeSolutions() {
  return (
    <section id="solutions" className="border-b border-white/8 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.solutions.label}
          title={siteConfig.homeSections.solutions.title}
          description={siteConfig.homeSections.solutions.description}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {siteConfig.solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={staggerDelay(i, 0.04)}
              whileHover={{ y: -3 }}
            >
              <Link href={solution.href} className="group block h-full">
                <GlassCard variant="pressed" hover className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display-heading text-lg text-text group-hover:text-purple-bright">
                      {solution.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple" />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {solution.outcome}
                  </p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
