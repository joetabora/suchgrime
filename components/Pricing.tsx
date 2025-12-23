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
    color: 'green',
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
      'Local SEO domination',
      '6 months SEO maintenance included',
      'Analytics & reporting setup',
    ],
    color: 'red',
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
    color: 'purple',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="py-24 sm:py-32 relative paper-tear">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-distressed distressed-text text-center">
            Pricing
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Web Design + Monthly SEO. No surprises. Just results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => {
              const colorClasses = {
                green: 'border-grime-green',
                red: 'border-grime-red',
                purple: 'border-grime-purple',
              }

              const textColorClasses = {
                green: 'text-grime-green',
                red: 'text-grime-red',
                purple: 'text-grime-purple',
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`brutal-border p-8 bg-grime-charcoal relative ${
                    colorClasses[tier.color as keyof typeof colorClasses]
                  } ${tier.popular ? 'scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-grime-red text-grime-black font-bold text-sm">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className={`text-4xl font-bold mb-2 ${textColorClasses[tier.color as keyof typeof textColorClasses]}`}>
                      {tier.price}
                    </div>
                    <div className="text-sm text-gray-400">+ {tier.monthly} SEO</div>
                    <div className="text-xs text-gray-500 mt-2">{tier.description}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`text-grime-green mr-2 ${textColorClasses[tier.color as keyof typeof textColorClasses]}`}>
                          ✓
                        </span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block w-full text-center px-6 py-3 font-bold transition-all brutal-border ${
                      tier.popular
                        ? 'bg-grime-red text-grime-black hover:bg-grime-red/80'
                        : `bg-transparent border-2 ${textColorClasses[tier.color as keyof typeof textColorClasses]} hover:bg-grime-charcoal`
                    }`}
                  >
                    Start Project
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
