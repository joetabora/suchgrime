'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 sm:py-32 relative paper-tear">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 font-distressed distressed-text text-grime-red neon-glow-red">
            We&apos;re not your polished agency.
          </h2>

          <div className="max-w-4xl space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
            <p>
              Tired of cookie-cutter sites that vanish on Google? We build gritty, high-converting experiences that look badass and rank harder. From simple informational refreshes to full e-commerce beasts, we handle design, SEO setup, and ongoing domination. No fluff. Just results.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="brutal-border p-6 bg-grime-charcoal">
                <div className="text-3xl font-bold text-grime-green mb-2">$2k–4k</div>
                <div className="text-sm text-gray-400">Basic</div>
                <div className="text-xs text-gray-500 mt-2">Simple refresh, essential SEO</div>
              </div>
              <div className="brutal-border p-6 bg-grime-charcoal">
                <div className="text-3xl font-bold text-grime-green mb-2">$4k–7k</div>
                <div className="text-sm text-gray-400">Standard</div>
                <div className="text-xs text-gray-500 mt-2">Full redesign, comprehensive SEO</div>
              </div>
              <div className="brutal-border p-6 bg-grime-charcoal border-grime-purple">
                <div className="text-3xl font-bold text-grime-purple mb-2">$7k–15k</div>
                <div className="text-sm text-gray-400">Premium</div>
                <div className="text-xs text-gray-500 mt-2">E-commerce builds, advanced features</div>
              </div>
              <div className="brutal-border p-6 bg-grime-charcoal">
                <div className="text-3xl font-bold text-grime-green mb-2">$500–2k</div>
                <div className="text-sm text-gray-400">Monthly SEO</div>
                <div className="text-xs text-gray-500 mt-2">Ongoing optimization & growth</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
