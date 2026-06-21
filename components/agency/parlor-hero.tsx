"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"

const headlineLines = ["PREMIUM", "WEB", "CRAFT"]

export function ParlorHero() {
  const pills = [...siteConfig.marqueePhrases, ...siteConfig.marqueePhrases]

  return (
    <section className="relative flex min-h-screen flex-col border-b border-white/10 pt-[57px]">
      <div className="absolute inset-0 poster-grid scanline" aria-hidden="true" />

      <div className="relative flex flex-1 flex-col justify-center px-6 py-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="sticker mb-8">Open for Projects</span>

          <h1 className="font-display leading-[0.85] tracking-wide">
            {headlineLines.map((line) => (
              <span key={line} className="block text-[clamp(4rem,15vw,11rem)]">
                {line}
              </span>
            ))}
            <span className="mt-2 block text-[clamp(2.5rem,8vw,6rem)] text-parlor-accent">
              FOR BRANDS THAT DON&apos;T DO BORING
            </span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative border-t border-white/10 bg-bg"
      >
        <div className="mx-auto grid max-w-[1400px] border-white/10 lg:grid-cols-2 lg:border-x">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <p className="text-label mb-2">{siteConfig.tagline}</p>
            <p className="max-w-md text-muted">{siteConfig.heroSubtext}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#work"
                className="bg-parlor-accent px-8 py-3 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
              >
                SEE OUR WORK
              </a>
              <a
                href="#contact"
                className="border border-white/20 px-8 py-3 font-display text-xl tracking-wider transition-colors hover:border-parlor-accent hover:text-parlor-accent"
              >
                START A PROJECT
              </a>
            </div>
          </div>

          <div className="overflow-hidden py-4" aria-hidden="true">
            <div className="marquee-track flex w-max gap-3">
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
        </div>
      </motion.div>
    </section>
  )
}
