"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { PortraitImage } from "@/components/marketing/portrait-image"

export function HomeAboutJoe() {
  const bioParagraphs = siteConfig.aboutJoe.bio.split("\n\n").filter(Boolean)

  return (
    <section id="about-joe" className="border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.aboutJoe.label}
          title={siteConfig.homeSections.aboutJoe.title}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bracket-frame"
          >
            <PortraitImage />
            <ul className="mt-6 flex flex-wrap gap-2">
              {siteConfig.aboutJoe.backgroundAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-purple/20 bg-purple/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard variant="steel" className="mb-8 border-l-4 border-l-purple">
              <p className="font-display text-xl leading-snug tracking-wide text-text md:text-2xl">
                &ldquo;{siteConfig.aboutJoe.pullQuote}&rdquo;
              </p>
            </GlassCard>

            <div className="space-y-4 text-muted leading-relaxed">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={siteConfig.primaryCtaHref}
                className="inline-block rounded-md bg-parlor-accent px-8 py-3 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
              >
                {siteConfig.primaryCta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
