'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'STARTER',
    price: '$2k–4k',
    monthly: '$500/mo',
    description: 'Simple refresh, essential SEO',
    features: [
      'Website refresh (up to 5 pages)',
      'Mobile responsive design',
      'Basic SEO setup',
      'Google Business Profile optimization',
      '3 months SEO maintenance included',
    ],
  },
  {
    name: 'GROWTH',
    price: '$4k–7k',
    monthly: '$1k/mo',
    description: 'Full redesign, comprehensive SEO',
    features: [
      'Complete website redesign',
      'Advanced SEO optimization',
      'Content strategy & creation',
      'Local SEO optimization',
      '6 months SEO maintenance included',
      'Analytics & reporting setup',
    ],
    popular: true,
  },
  {
    name: 'SCALE',
    price: '$7k–15k',
    monthly: '$2k/mo',
    description: 'E-commerce builds, advanced features',
    features: [
      'Full e-commerce build',
      'Payment gateway integration',
      'Inventory management',
      'Advanced SEO & marketing',
      '12 months SEO maintenance included',
      'Ongoing optimization',
      'Priority support',
    ],
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-neutral-900 mb-6 tracking-wide">
              SERVICES & PRICING
            </h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Transparent pricing for web design and ongoing SEO. No surprises. Just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative p-8 bg-white border-2 transition-all duration-300 hover:border-neutral-900 ${
                  tier.popular ? 'border-neutral-900' : 'border-neutral-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-display mb-3 text-neutral-900 tracking-wider">{tier.name}</h3>
                  <div className="text-5xl font-display mb-2 text-neutral-900 tracking-wide">{tier.price}</div>
                  <div className="text-sm text-neutral-500 mb-3">+ {tier.monthly} SEO</div>
                  <div className="text-xs text-neutral-400">{tier.description}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`block text-center py-3 font-semibold transition-colors ${
                    tier.popular 
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                      : 'border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Budget flexibility note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full mb-4">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-neutral-600">Flexible Pricing</span>
            </div>
            <p className="text-neutral-500">
              These prices are general estimates to give you a starting point. Every project is unique, 
              and we&apos;re happy to work with most budgets. <a href="#contact" className="text-neutral-900 font-medium hover:underline">Let&apos;s chat</a> about 
              what works for you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
