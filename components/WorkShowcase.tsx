'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: "Joe&apos;s Used Harleys",
    category: 'E-commerce • Web Design',
    gradient: 'from-neutral-800 to-neutral-900',
    url: 'https://joesusedharleys.com',
  },
  {
    title: 'Milwaukee SaaS',
    category: 'Web App • UI/UX',
    gradient: 'from-neutral-700 to-neutral-800',
    url: '#',
  },
  {
    title: 'Local Restaurant',
    category: 'Branding • Website',
    gradient: 'from-neutral-600 to-neutral-700',
    url: '#',
  },
  {
    title: 'Real Estate Agency',
    category: 'SEO • Web Design',
    gradient: 'from-neutral-500 to-neutral-600',
    url: '#',
  },
  {
    title: 'Tech Startup',
    category: 'Brand Launch',
    gradient: 'from-neutral-800 to-neutral-900',
    url: '#',
  },
  {
    title: 'Fitness Brand',
    category: 'E-commerce • Marketing',
    gradient: 'from-neutral-700 to-neutral-800',
    url: '#',
  },
]

const allProjects = [...projects, ...projects]

export default function WorkShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-24 sm:py-32 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display text-neutral-900 mb-4 tracking-wide">
              OUR WORK
            </h2>
            <p className="text-xl text-neutral-500 max-w-xl">
              Real results for real businesses. Here&apos;s a taste of what we do.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-neutral-900 font-semibold hover:gap-3 transition-all group"
          >
            View all projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery - Row 1 */}
      <div className="relative mb-6">
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {allProjects.map((project, index) => (
            <Link
              key={`row1-${index}`}
              href={project.url}
              target={project.url.startsWith('http') ? '_blank' : undefined}
              className="group flex-shrink-0 w-[350px] sm:w-[400px] md:w-[450px]"
            >
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    className="transform group-hover:-translate-y-2 transition-transform duration-300"
                  >
                    <p className="text-white/60 text-sm mb-1">{project.category}</p>
                    <h3 className="text-white text-2xl font-display tracking-wide">{project.title}</h3>
                  </motion.div>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery - Row 2 (Reverse) */}
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 45,
              ease: 'linear',
            },
          }}
        >
          {[...allProjects].reverse().map((project, index) => (
            <Link
              key={`row2-${index}`}
              href={project.url}
              target={project.url.startsWith('http') ? '_blank' : undefined}
              className="group flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]"
            >
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                    <p className="text-white/60 text-sm mb-1">{project.category}</p>
                    <h3 className="text-white text-xl font-display tracking-wide">{project.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
