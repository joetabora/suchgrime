"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"
import { staggerDelay } from "@/components/marketing/motion"

export function HomeWebsites() {
  return (
    <section className="poster-section border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          label="Websites Still Matter"
          title={siteConfig.websiteServices.headline}
          description={siteConfig.websiteServices.description}
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {siteConfig.websiteServices.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={staggerDelay(i, 0.04)}
              className="sticker"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/web-design" className="font-display text-lg tracking-wider text-parlor-accent hover:text-parlor-accent/80">
            Explore web development services →
          </Link>
        </div>
      </div>
    </section>
  )
}
