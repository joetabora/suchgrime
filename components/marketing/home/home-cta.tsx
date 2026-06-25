"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GradientText } from "@/components/marketing/gradient-text"
import { springGentle } from "@/components/marketing/motion"

export function HomeCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 grid-glow paper-grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springGentle}
        >
          <SectionHeading
            align="center"
            className="mx-auto max-w-3xl text-center [&_.printer-rule]:mx-auto"
            label={siteConfig.homeSections.cta.label}
            title={
              <>
                {siteConfig.homeSections.cta.title}
                <br />
                <GradientText as="span">{siteConfig.homeSections.cta.titleGradient}</GradientText>
              </>
            }
            description={siteConfig.homeSections.cta.description}
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={siteConfig.primaryCtaHref}
              className="rounded-sm bg-parlor-accent px-10 py-4 text-base font-semibold text-text transition-colors hover:bg-parlor-accent/85"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="#solutions"
              className="pressed-card rounded-sm border border-white/10 px-10 py-4 text-base font-semibold text-muted transition-colors hover:border-purple/30 hover:text-text"
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
          <p className="text-label mt-8">
            {siteConfig.contact.note} · {siteConfig.contact.email}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
