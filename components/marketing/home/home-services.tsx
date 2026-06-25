"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"

export function HomeServices() {
  return (
    <section id="services" className="border-b border-white/10 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.services.label}
          title={siteConfig.homeSections.services.title}
          description={siteConfig.homeSections.services.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {siteConfig.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={pillar.href} className="group block h-full">
                <GlassCard hover className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl tracking-wide md:text-3xl">
                      {pillar.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech" />
                  </div>
                  <p className="mt-3 text-muted">{pillar.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {pillar.examples.slice(0, 4).map((ex) => (
                      <li
                        key={ex}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
