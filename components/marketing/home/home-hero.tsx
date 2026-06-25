"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { GradientText } from "@/components/marketing/gradient-text"
import { Stamp } from "@/components/marketing/stamp"
import { HandAnnotation } from "@/components/marketing/hand-annotation"
import { springGentle } from "@/components/marketing/motion"

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen flex-col border-b border-white/8 pt-[57px]">
      <div className="absolute inset-0 grid-glow paper-grain" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 py-20 md:px-12 lg:pl-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springGentle}
          className="bracket-frame max-w-4xl py-8 pl-6 md:pl-10"
        >
          <Stamp className="mb-8">{siteConfig.homeSections.hero.badge}</Stamp>

          <h1 className="display-heading max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] text-text letterpress">
            {siteConfig.heroHeadline}
          </h1>

          <p className="relative mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
            <GradientText as="span">{siteConfig.tagline}</GradientText>
            <HandAnnotation kind="underline" className="opacity-80" />
          </p>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{siteConfig.heroSubtext}</p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={siteConfig.primaryCtaHref}
              className="rounded-sm bg-parlor-accent px-8 py-3.5 text-base font-semibold text-text transition-colors hover:bg-parlor-accent/85"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="#solutions"
              className="pressed-card rounded-sm border border-white/10 px-8 py-3.5 text-base font-semibold text-muted transition-colors hover:border-purple/30 hover:text-text"
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-6 py-5 md:px-12">
          <div className="flex flex-wrap gap-2">
            {siteConfig.marqueePhrases.slice(0, 8).map((phrase, i) => (
              <span
                key={phrase}
                className="ink-stamp text-[10px]"
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
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
