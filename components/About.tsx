'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-12 text-primary">
            We&apos;re not your typical agency.
          </h2>

          <div className="space-y-8 text-lg text-neutral-700 leading-relaxed mb-16">
            <p className="text-xl">
              Tired of cookie-cutter websites that disappear in search results? We create strategic, high-converting digital experiences that perform. From simple site refreshes to comprehensive e-commerce platforms, we handle design, SEO, and ongoing optimization. No fluff. Just measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-neutral-200">
              <div className="text-2xl font-bold text-primary mb-2">$2k–4k</div>
              <div className="text-sm font-medium text-neutral-600 mb-1">Basic</div>
              <div className="text-xs text-neutral-500">Simple refresh, essential SEO</div>
            </div>
            <div className="p-6 bg-white border border-neutral-200">
              <div className="text-2xl font-bold text-primary mb-2">$4k–7k</div>
              <div className="text-sm font-medium text-neutral-600 mb-1">Standard</div>
              <div className="text-xs text-neutral-500">Full redesign, comprehensive SEO</div>
            </div>
            <div className="p-6 bg-white border-2 border-primary">
              <div className="text-2xl font-bold text-primary mb-2">$7k–15k</div>
              <div className="text-sm font-medium text-neutral-600 mb-1">Premium</div>
              <div className="text-xs text-neutral-500">E-commerce builds, advanced features</div>
            </div>
            <div className="p-6 bg-white border border-neutral-200">
              <div className="text-2xl font-bold text-primary mb-2">$500–2k</div>
              <div className="text-sm font-medium text-neutral-600 mb-1">Monthly SEO</div>
              <div className="text-xs text-neutral-500">Ongoing optimization & growth</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
