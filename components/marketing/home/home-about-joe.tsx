"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { PortraitImage } from "@/components/marketing/portrait-image"
import { Stamp } from "@/components/marketing/stamp"
import { slideInLeft, staggerDelay } from "@/components/marketing/motion"

export function HomeAboutJoe() {
  const bioParagraphs = siteConfig.aboutJoe.bio.split("\n\n").filter(Boolean)

  return (
    <section id="about-joe" className="border-b border-white/8 py-24 md:py-32 paper-grain">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label={siteConfig.homeSections.aboutJoe.label}
          title={siteConfig.homeSections.aboutJoe.title}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-16">
          <motion.div {...slideInLeft} className="bracket-frame">
            <PortraitImage />
            <ul className="mt-6 flex flex-wrap gap-2">
              {siteConfig.aboutJoe.backgroundAreas.map((area) => (
                <li key={area}>
                  <Stamp rotate={area.length % 2 === 0 ? "left" : "right"}>{area}</Stamp>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={staggerDelay(1)}
          >
            <GlassCard variant="pressed" className="mb-8 border-l-2 border-l-purple">
              <p className="font-quote text-xl leading-snug text-text md:text-2xl">
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
                className="inline-block rounded-sm bg-parlor-accent px-8 py-3 text-base font-semibold text-text transition-colors hover:bg-parlor-accent/85"
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
