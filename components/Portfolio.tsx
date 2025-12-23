'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: 'Milwaukee Plumbing Co.',
    description: 'Doubled leads in 3 months with a complete refresh and local SEO domination.',
    category: 'Website Refresh + SEO',
    image: '/api/placeholder/600/400',
  },
  {
    title: 'Brew City Auto Repair',
    description: 'E-commerce integration for parts sales. 40% revenue increase in first quarter.',
    category: 'E-commerce Build',
    image: '/api/placeholder/600/500',
  },
  {
    title: 'Lakefront Landscaping',
    description: 'Ranked #1 for "landscaping Milwaukee" within 6 months. Lead gen machine.',
    category: 'SEO Domination',
    image: '/api/placeholder/600/450',
  },
  {
    title: 'Rust Belt Manufacturing',
    description: 'Complete B2B site overhaul. Modern design meets industrial grit.',
    category: 'Full Redesign',
    image: '/api/placeholder/600/400',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative paper-tear">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 font-distressed distressed-text text-center text-grime-purple neon-glow-purple">
            Sites that don't suck.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="brutal-border bg-grime-charcoal overflow-hidden group"
              >
                <div className="relative h-64 bg-gradient-to-br from-grime-charcoal to-grime-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-grime-green/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-6xl opacity-20">💀</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-grime-green mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <Link
                    href="/portfolio"
                    className="inline-block text-grime-green font-bold hover:text-grime-green/80 transition-colors"
                  >
                    View Case Study →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 border-3 border-grime-green text-grime-green font-bold text-lg hover:bg-grime-green hover:text-grime-black transition-all brutal-border"
            >
              View Full Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
