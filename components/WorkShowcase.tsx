'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: "Joe's Used Harleys",
    subtitle: 'E-commerce • Web Design • SEO',
    description: 'Complete e-commerce platform for a Milwaukee motorcycle dealership. Built a custom inventory system with financing calculator and lead generation.',
    url: 'https://joesusedharleys.com',
    stats: [
      { label: 'Increase in Leads', value: '340%' },
      { label: 'Page Load Time', value: '1.2s' },
      { label: 'Mobile Traffic', value: '72%' },
    ],
    features: ['Custom inventory management', 'Financing calculator', 'Lead capture forms', 'Mobile-first design'],
    gradient: 'from-neutral-800 via-neutral-900 to-black',
  },
  {
    id: 2,
    title: 'SuchGrime',
    subtitle: 'Brand Identity • Web Design • Development',
    description: 'Our own digital presence. A showcase of modern web design with smooth animations, custom cursor effects, and conversion-focused layout.',
    url: '#',
    stats: [
      { label: 'Lighthouse Score', value: '98' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'Animations', value: '15+' },
    ],
    features: ['Custom animations', 'Water ripple cursor', 'Single-page flow', 'Mobile responsive'],
    gradient: 'from-neutral-700 via-neutral-800 to-neutral-900',
  },
]

export default function WorkShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section id="work" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-neutral-900 mb-4 tracking-wide">
            SELECTED WORK
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl">
            Quality over quantity. Here are projects we&apos;re proud of.
          </p>
        </motion.div>

        {/* Project Selector Tabs */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-6 py-3 font-display text-lg tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeProject === index
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {String(index + 1).padStart(2, '0')} — {project.title}
            </button>
          ))}
          <div className="px-6 py-3 bg-neutral-50 text-neutral-400 font-display text-lg tracking-wide whitespace-nowrap border-2 border-dashed border-neutral-200">
            03 — Your Project?
          </div>
        </div>

        {/* Featured Project Display */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={false}
            animate={{
              opacity: activeProject === index ? 1 : 0,
              y: activeProject === index ? 0 : 20,
              display: activeProject === index ? 'block' : 'none',
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Image/Preview */}
              <motion.div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-8 w-32 h-32 border border-white/30 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 border border-white/30 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full" />
                </div>
                
                {/* Project title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-display text-white tracking-wide mb-4">
                      {project.title}
                    </h3>
                    {project.url !== '#' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/20 transition-colors"
                      >
                        Visit Live Site
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Project Details */}
              <div>
                <div className="mb-6">
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">{project.subtitle}</p>
                  <p className="text-lg text-neutral-600 leading-relaxed">{project.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-neutral-50 rounded-lg">
                      <div className="text-3xl sm:text-4xl font-display text-neutral-900 mb-1">{stat.value}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">What We Built</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-neutral-600">
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-neutral-900 font-semibold hover:gap-3 transition-all group"
                >
                  Want something like this?
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-8 sm:p-12 bg-neutral-50 rounded-2xl text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-display text-neutral-900 mb-4 tracking-wide">
            YOUR PROJECT COULD BE NEXT
          </h3>
          <p className="text-neutral-500 mb-6 max-w-xl mx-auto">
            We&apos;re selective about the projects we take on. If you&apos;re serious about growth, let&apos;s talk.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
