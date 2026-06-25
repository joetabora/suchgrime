"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"

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
          <p className="text-label mb-4">Ready to build?</p>
          <h2 className="font-display text-4xl tracking-wide md:text-6xl lg:text-7xl">
            Let&apos;s Design The Systems
            <br />
            <span className="text-gradient">Your Business Actually Needs</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Book a strategy call. We&apos;ll map your workflows, identify bottlenecks, and outline what custom software or automation could look like for your business.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
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
