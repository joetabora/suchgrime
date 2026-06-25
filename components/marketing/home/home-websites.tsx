"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"

export function HomeWebsites() {
  return (
    <section className="border-b border-white/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label="Websites Still Matter"
          title={siteConfig.websiteServices.headline}
          description={siteConfig.websiteServices.description}
        />

        <div className="mt-12 flex flex-wrap gap-3">
          {siteConfig.websiteServices.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass glass-border rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted backdrop-blur-sm"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/web-design"
            className="inline-flex items-center gap-2 text-purple hover:underline"
          >
            Explore web development services →
          </Link>
        </div>
      </div>
    </section>
  )
}
