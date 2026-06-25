"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeading } from "@/components/marketing/section-heading"

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-b border-white/10 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 md:px-12">
        <SectionHeading
          label="FAQ"
          title="Common Questions"
          description="Straight answers about custom software, automation, and how we work with businesses like yours."
        />

        <div className="mt-12 divide-y divide-white/10 border border-white/10">
          {siteConfig.homeFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-text">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-muted">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
