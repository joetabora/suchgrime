'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'

const platforms = [
  {
    name: 'Instagram',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    description: 'Stories, Reels, Posts',
  },
  {
    name: 'TikTok',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
    description: 'Viral Content, Trends',
  },
  {
    name: 'YouTube',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    description: 'Long-form, Reviews',
  },
  {
    name: 'Twitter/X',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    description: 'Threads, Engagement',
  },
]

const benefits = [
  'Authentic brand partnerships',
  'Vetted influencer network',
  'Campaign strategy & management',
  'Performance tracking & analytics',
  'Content rights negotiation',
  'Multi-platform campaigns',
]

export default function InfluencerMarketing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="influencer" className="py-24 sm:py-32 bg-neutral-900 text-white overflow-hidden relative">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 border border-neutral-800 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-neutral-800 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 border border-neutral-700 rounded-full mb-6"
            >
              <span className="text-sm text-neutral-400 uppercase tracking-wider">New Service</span>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-white mb-6 tracking-wide">
              INFLUENCER MARKETING
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Connect your brand with the right voices. We work with a diverse network of influencers 
              across Instagram, TikTok, YouTube, and more to amplify your message authentically.
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 bg-neutral-800/50 border border-neutral-700 hover:border-neutral-500 transition-all duration-300 text-center group"
              >
                <div className="text-neutral-400 group-hover:text-white transition-colors mb-4 flex justify-center">
                  {platform.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-2 tracking-wide">{platform.name}</h3>
                <p className="text-sm text-neutral-500">{platform.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-display text-white mb-6 tracking-wide">WHAT WE OFFER</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-neutral-800/50 border border-neutral-700"
            >
              <h3 className="text-2xl font-display text-white mb-4 tracking-wide">CUSTOM PRICING</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Every influencer and campaign is unique. Rates vary based on:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="text-neutral-400">• Influencer reach & engagement</li>
                <li className="text-neutral-400">• Platform selection</li>
                <li className="text-neutral-400">• Content type & deliverables</li>
                <li className="text-neutral-400">• Campaign duration</li>
                <li className="text-neutral-400">• Usage rights</li>
              </ul>
              <div className="p-4 bg-neutral-900 border border-neutral-700">
                <p className="text-sm text-neutral-400">
                  <span className="text-white font-semibold">Starting from:</span> Micro-influencers (10K-100K followers) 
                  to macro-influencers (1M+ followers). We&apos;ll match you with the perfect fit for your budget and goals.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
            >
              Discuss Your Campaign
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

