'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    title: 'Milwaukee Plumbing Co.',
    description: 'Complete website refresh and local SEO domination. Doubled leads in 3 months.',
    category: 'Website Refresh + SEO',
    results: ['2x leads', 'Ranked #1 for 5 keywords', '40% conversion increase'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Brew City Auto Repair',
    description: 'E-commerce integration for parts sales. Modern design meets industrial grit.',
    category: 'E-commerce Build',
    results: ['40% revenue increase', '500+ products cataloged', 'Mobile-first design'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Lakefront Landscaping',
    description: 'Ranked #1 for "landscaping Milwaukee" within 6 months. Lead gen machine.',
    category: 'SEO Domination',
    results: ['#1 Google ranking', '300% organic traffic', 'Local pack dominance'],
    image: '/api/placeholder/800/600',
  },
  {
    title: 'Rust Belt Manufacturing',
    description: 'Complete B2B site overhaul. Modern design meets industrial grit.',
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
    <main className="pt-20">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-distressed distressed-text mb-6 text-grime-purple neon-glow-purple">
              Sites that don't suck.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real projects. Real results. Milwaukee businesses crushing it online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <ul className="space-y-1 mb-4">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-grime-green">
                        ✓ {result}
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
              className="inline-block px-8 py-4 bg-grime-green text-grime-black font-bold text-lg hover:bg-grime-green/80 transition-all brutal-border"
            >
              Get Your Project Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
