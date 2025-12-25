'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Basic',
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
    name: 'Standard',
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
    name: 'Premium',
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

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="py-24 sm:py-32 relative bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wider mb-6 text-primary">
              Pricing
            </h2>
            <p className="text-lg text-neutral-600">
              Transparent pricing for web design and ongoing SEO. No surprises. Just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`p-8 bg-white border transition-all duration-300 ${
                  tier.popular ? 'border-2 border-primary' : 'border-neutral-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-medium uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold mb-3 text-primary">{tier.name}</h3>
                  <div className="text-4xl font-display font-bold mb-2 text-primary">{tier.price}</div>
                  <div className="text-sm text-neutral-500 mb-3">+ {tier.monthly} SEO</div>
                  <div className="text-xs text-neutral-400">{tier.description}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center px-6 py-3 font-medium transition-all duration-300 ${
                    tier.popular
                      ? 'bg-primary text-white hover:bg-neutral-900'
                      : 'bg-neutral-100 text-primary hover:bg-neutral-200'
                  }`}
                >
                  Start Project
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Flexible budget message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-16 pt-12 border-t border-neutral-200"
          >
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-primary">We can work with any size business with any size budget.</strong> Every project is unique – let&apos;s discuss your specific needs and create a custom solution that fits.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center mt-6 text-primary font-medium hover:underline"
            >
              Get in touch for a custom quote
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
