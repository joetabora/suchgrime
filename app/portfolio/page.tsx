'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    title: 'Milwaukee Plumbing Co.',
    description: 'Complete website refresh and local SEO optimization. Doubled leads in 3 months.',
    category: 'Website Refresh + SEO',
    results: ['2x leads', 'Ranked #1 for 5 keywords', '40% conversion increase'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Brew City Auto Repair',
    description: 'E-commerce integration for parts sales. Modern design meets industrial precision.',
    category: 'E-commerce Build',
    results: ['40% revenue increase', '500+ products cataloged', 'Mobile-first design'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Lakefront Landscaping',
    description: 'Ranked #1 for "landscaping Milwaukee" within 6 months. Lead generation machine.',
    category: 'SEO Domination',
    results: ['#1 Google ranking', '300% organic traffic', 'Local pack dominance'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Rust Belt Manufacturing',
    description: 'Complete B2B site overhaul. Modern design meets industrial precision.',
    category: 'Full Redesign',
    results: ['50% bounce rate reduction', '3x form submissions', 'Enterprise features'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Milwaukee Food Truck Co.',
    description: 'Mobile-optimized site with location tracking and menu management.',
    category: 'Mobile-First Design',
    results: ['60% mobile traffic', 'Real-time location updates', 'Online ordering integration'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Craft Brewery Collective',
    description: 'E-commerce site for beer sales with subscription model and local delivery.',
    category: 'E-commerce + Subscription',
    results: ['Monthly recurring revenue', 'Local delivery integration', 'Brewery tour bookings'],
    image: '/api/placeholder/800/600',
  },
]

export default function PortfolioPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-6 text-primary">
              Portfolio
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Real projects. Real results. Milwaukee businesses achieving measurable growth online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-neutral-50 border border-neutral-200 overflow-hidden group hover:border-primary transition-all duration-300"
              >
                <div className="relative h-64 bg-neutral-100 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl text-neutral-300">—</div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">{project.category}</div>
                  <h3 className="text-xl font-display font-bold mb-3 text-primary">{project.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4">{project.description}</p>
                  <ul className="space-y-1 mb-4">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-xs text-neutral-500 flex items-center">
                        <svg className="w-3 h-3 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium hover:bg-neutral-900 transition-all duration-300"
            >
              Get Your Project Started
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
