"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GradientText } from "@/components/marketing/gradient-text"

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen flex-col border-b border-white/10 pt-[57px]">
      <div className="absolute inset-0 grid-glow" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center border-x border-white/10 px-6 py-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-6 inline-block rounded-full border border-tech/30 bg-tech/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-tech">
            {siteConfig.homeSections.hero.badge}
          </span>

          <h1 className="max-w-5xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-wide">
            {siteConfig.heroHeadline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
            <GradientText as="span">{siteConfig.tagline}</GradientText>
          </p>

          <p className="mt-4 max-w-2xl text-muted">{siteConfig.heroSubtext}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={siteConfig.primaryCtaHref}
              className="rounded-md bg-parlor-accent px-8 py-3.5 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="/work"
              className="glass glass-border rounded-md border px-8 py-3.5 font-display text-xl tracking-wider backdrop-blur-sm transition-colors hover:border-tech/40 hover:text-tech"
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-4 md:px-12">
          <div className="flex flex-wrap gap-2">
            {siteConfig.marqueePhrases.slice(0, 8).map((phrase) => (
              <span
                key={phrase}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
