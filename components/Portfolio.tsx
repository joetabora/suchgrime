'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: 'Milwaukee Plumbing Co.',
    description: 'Complete website refresh and local SEO optimization. Doubled leads in 3 months.',
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
    description: 'Ranked #1 for "landscaping Milwaukee" within 6 months. Lead generation machine.',
    category: 'SEO Domination',
    image: '/api/placeholder/600/450',
  },
  {
    title: 'Rust Belt Manufacturing',
    description: 'Complete B2B site overhaul. Modern design meets industrial precision.',
    category: 'Full Redesign',
    image: '/api/placeholder/600/400',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-primary">
              Portfolio
            </h2>
            <p className="text-lg text-neutral-600">
              Real projects. Real results. Milwaukee businesses achieving measurable growth online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-white border border-neutral-200 overflow-hidden hover:border-primary transition-all duration-300"
              >
                <div className="relative h-64 bg-neutral-100 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl text-neutral-300">—</div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">{project.category}</div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-primary">{project.title}</h3>
                  <p className="text-neutral-600 mb-6">{project.description}</p>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center text-primary font-medium hover:underline group"
                  >
                    View Case Study
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 border border-neutral-300 text-primary font-medium hover:border-primary hover:bg-neutral-50 transition-all duration-300"
            >
              View Full Portfolio
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
