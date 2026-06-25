"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { PortraitImage } from "@/components/marketing/portrait-image"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeAboutJoe() {
  const bioParagraphs = siteConfig.aboutJoe.bio.split("\n\n").filter(Boolean)

  return (
    <section id="about-joe" className="poster-section border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.aboutJoe.label}
          title={siteConfig.homeSections.aboutJoe.title}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={staggerDelay(0)}
          >
            <PortraitImage />
            <ul className="mt-6 flex flex-wrap gap-2">
              {siteConfig.aboutJoe.backgroundAreas.map((area) => (
                <li key={area}>
                  <span className="sticker">{area}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={staggerDelay(1)}
          >
            <GlassCard className="mb-8 border-l-2 border-l-parlor-accent">
              <p className="font-display text-xl tracking-wide text-parlor-accent md:text-2xl">
                &ldquo;{siteConfig.aboutJoe.pullQuote}&rdquo;
              </p>
            </GlassCard>

            <div className="space-y-4 leading-relaxed text-muted">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={siteConfig.primaryCtaHref}
                className="inline-block bg-parlor-accent px-8 py-3 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
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
