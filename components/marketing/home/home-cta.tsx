"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GradientText } from "@/components/marketing/gradient-text"

export function HomeCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 grid-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px] border-x border-white/10 px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="center"
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
              className="rounded-md bg-parlor-accent px-10 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link
              href="/work"
              className="glass glass-border rounded-md border px-10 py-4 font-display text-xl tracking-wider backdrop-blur-sm transition-colors hover:border-tech/40 hover:text-tech"
            >
              {siteConfig.secondaryCta}
            </Link>
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted">
            {siteConfig.contact.note} · {siteConfig.contact.email}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
