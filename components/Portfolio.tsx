'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: 'Guerrilla Social Club',
    description: 'AI-powered experimental social platform. Built entirely autonomous with zero human intervention. Revolutionary approach to community building.',
    category: 'AI Autonomous Build',
    metrics: { stat: '100%', label: 'AI Built' },
    tags: ['Next.js', 'AI', 'Experimental'],
    link: 'https://guerrillasocialclub.com',
  },
  {
    title: 'Milwaukee Plumbing Co.',
    description: 'Complete website refresh and local SEO optimization. Transformed their digital presence from invisible to unavoidable.',
    category: 'Website Refresh + SEO',
    metrics: { stat: '2x', label: 'Lead Growth' },
    tags: ['SEO', 'Web Design', 'Local'],
    link: '/portfolio',
  },
  {
    title: 'Brew City Auto Repair',
    description: 'E-commerce integration for parts sales. Strategic digital transformation that turned browsers into buyers.',
    category: 'E-commerce Build',
    metrics: { stat: '40%', label: 'Revenue ↑' },
    tags: ['E-commerce', 'Strategy', 'Growth'],
    link: '/portfolio',
  },
  {
    title: 'Lakefront Landscaping',
    description: 'Ranked #1 for "landscaping Milwaukee" within 6 months. A masterclass in local search domination.',
    category: 'SEO Domination',
    metrics: { stat: '#1', label: 'Rankings' },
    tags: ['SEO', 'Content', 'Analytics'],
    link: '/portfolio',
  },
  {
    title: 'Rust Belt Manufacturing',
    description: 'Complete B2B site overhaul. Modern design meets industrial precision. Where form serves function.',
    category: 'Full Redesign',
    metrics: { stat: '∞', label: 'Impact' },
    tags: ['B2B', 'Design', 'Strategy'],
    link: '/portfolio',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-primary transition-all duration-500 hover:shadow-2xl"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03) 0%, transparent 50%)',
        }}
      />
      
      {/* Accent corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              {project.category}
            </div>
            <motion.div
              className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 text-primary group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>
          
          <p className="text-neutral-600 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs px-3 py-1 bg-neutral-100 text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-auto pt-6 border-t border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-3xl font-display font-bold text-primary">
              {project.metrics.stat}
            </div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">
              {project.metrics.label}
            </div>
          </div>
          
          <Link
            href={project.link}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            target={project.link.startsWith('http') ? '_blank' : undefined}
            rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            Explore
            <motion.svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </div>
      </div>

      {/* Hover highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-neutral-900 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative bg-white overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="max-w-4xl mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="text-xs font-medium text-neutral-500 uppercase tracking-[0.2em] mb-2">
                Selected Works
              </div>
              <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent" />
            </motion.div>
            
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-8 text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Portfolio
            </motion.h2>
            
            <motion.p 
              className="text-xl sm:text-2xl text-neutral-600 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Real projects. Real results. From experimental AI builds to Milwaukee businesses 
              achieving measurable growth online.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-20 pt-20 border-t border-neutral-200"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-primary">
              Ready to build something remarkable?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Let's create a digital presence that doesn't just exist—it dominates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-primary text-white font-medium hover:bg-neutral-900 transition-all duration-300 inline-flex items-center"
              >
                Start Your Project
                <motion.svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 border border-neutral-300 text-primary font-medium hover:border-primary hover:bg-neutral-50 transition-all duration-300"
              >
                View Full Portfolio
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
