'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import MagneticButton from './MagneticButton'

const options = [
  {
    id: 'new-site',
    title: "I need a new website",
    icon: '🚀',
    description: "You are starting fresh or your current site is beyond saving. We will design and build a conversion machine from the ground up.",
    color: 'bg-accent/10 border-accent/20 hover:border-accent',
    accent: 'text-accent',
  },
  {
    id: 'refresh',
    title: "My site needs a refresh",
    icon: '✨',
    description: "Your site works, but it is tired. We will modernize your design, improve UX, and optimize for conversions without starting over.",
    color: 'bg-accent-mint/10 border-accent-mint/20 hover:border-accent-mint',
    accent: 'text-accent-mint',
  },
  {
    id: 'seo',
    title: "I am invisible on Google",
    icon: '🔍',
    description: "You exist, but nobody can find you. We will audit your site, fix technical issues, and build a strategy to dominate search.",
    color: 'bg-accent-purple/10 border-accent-purple/20 hover:border-accent-purple',
    accent: 'text-accent-purple',
  },
  {
    id: 'everything',
    title: "I need it all",
    icon: '⚡',
    description: "You want the full package—design, development, SEO, and ongoing support. We will be your complete digital growth partner.",
    color: 'bg-accent-yellow/10 border-accent-yellow/20 hover:border-accent-yellow',
    accent: 'text-accent-yellow',
  },
]

export default function WhatDescribesYou() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              What best describes you?
            </motion.h2>
            <motion.p 
              className="text-xl text-neutral-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
              Click your situation. We&apos;ve got you covered.
            </motion.p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${option.color}`}
              >
                {/* Icon */}
                <motion.span 
                  className="text-4xl mb-4 block"
                  animate={{ 
                    scale: hoveredId === option.id ? 1.2 : 1,
                    rotate: hoveredId === option.id ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {option.icon}
                </motion.span>

                {/* Title */}
                <h3 className={`text-2xl font-display font-bold mb-3 ${option.accent} group-hover:translate-x-1 transition-transform`}>
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {option.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Tell me more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-neutral-500 mb-4">Not sure? That&apos;s okay.</p>
            <MagneticButton
              as="a"
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors"
            >
              Let&apos;s figure it out together
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

