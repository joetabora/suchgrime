"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GradientText } from "@/components/marketing/gradient-text"

export function HomeHero() {
  const pills = [...siteConfig.marqueePhrases, ...siteConfig.marqueePhrases]

  return (
    <section className="relative flex min-h-screen flex-col border-b border-white/10 pt-[57px]">
      <div className="absolute inset-0 poster-grid scanline" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 py-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="sticker mb-8">{siteConfig.homeSections.hero.badge}</span>

          <h1 className="font-display leading-[0.9] tracking-wide text-[clamp(2.5rem,6vw,5rem)]">
            {siteConfig.heroHeadline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            <GradientText as="span">{siteConfig.tagline}</GradientText>
          </p>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{siteConfig.heroSubtext}</p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={siteConfig.primaryCtaHref}
              className="bg-parlor-accent px-8 py-3.5 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="#solutions"
              className="border border-white/20 px-8 py-3.5 font-display text-xl tracking-wider text-muted transition-colors hover:border-parlor-accent hover:text-parlor-accent"
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative border-t border-white/10 bg-bg"
      >
        <div className="overflow-hidden py-4" aria-hidden="true">
          <div className="marquee-track flex w-max gap-3 px-6">
            {pills.map((phrase, i) => (
              <span
                key={`${phrase}-${i}`}
                className="shrink-0 border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
