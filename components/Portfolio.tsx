'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    title: 'Guerrilla Social Club',
    description: 'AI-Powered Experimental Platform. Built 100% autonomously with Cursor AI. Revolutionary community tool proving what&apos;s possible with modern workflows.',
    category: 'AI Autonomous Build',
    metrics: { stat: '100%', label: 'AI Built' },
    tags: ['Next.js', 'Cursor AI', 'Experimental'],
    link: 'https://guerrillasocialclub.com',
    isExternal: true,
    status: 'Live',
    mockupUrl: '/mockups/guerrilla-mockup.jpg',
    mockupAlt: 'Guerrilla Social Club website on laptop - AI-powered experimental platform',
  },
  {
    title: 'SuchGrime.com',
    description: 'Self-Build Showcase. This site: rapid AI-assisted development, transparent agency model, optimized for conversions. A demonstration of modern web development speed and quality.',
    category: 'Agency Site',
    metrics: { stat: '< 48h', label: 'Build Time' },
    tags: ['Next.js', 'Tailwind', 'SEO'],
    link: '#about',
    isExternal: false,
    status: 'Live',
    mockupUrl: '/mockups/suchgrime-mockup.jpg',
    mockupAlt: 'SuchGrime website hero section on multiple devices',
  },
  {
    title: 'Milwaukee Service Business',
    description: 'Incoming Client Project – Milwaukee Service Business Refresh. Full website overhaul with local SEO domination strategy. Coming soon.',
    category: 'Client Work',
    metrics: { stat: 'Soon', label: 'Launch Date' },
    tags: ['Web Design', 'Local SEO', 'Strategy'],
    link: '#contact',
    isExternal: false,
    status: 'In Progress',
    mockupUrl: '/mockups/coming-soon-mockup.jpg',
    mockupAlt: 'Coming soon - Milwaukee client project website mockup',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [3, -3])
  const rotateY = useTransform(x, [-100, 100], [-3, 3])

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
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white overflow-hidden hover:shadow-2xl transition-all duration-500"
    >
      {/* Distressed border effect */}
      <div className="absolute inset-0 border-2 border-neutral-900" />
      <div className="absolute -inset-px bg-gradient-to-br from-neutral-200 via-transparent to-neutral-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      
      {/* Glitch effect on hover */}
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 mix-blend-multiply transition-opacity duration-200" />
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Mockup Image */}
        <div className="relative h-64 bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          <Image
            src={project.mockupUrl}
            alt={project.mockupAlt}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Coming soon overlay for placeholder */}
          {project.status === 'In Progress' && (
            <div className="absolute inset-0 bg-neutral-900/80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bebas tracking-wider text-white mb-2">COMING SOON</div>
                <div className="text-sm text-neutral-400">Milwaukee Client Project</div>
              </div>
            </div>
          )}
          {/* Subtle scan line effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
        </div>

        {/* Text Content */}
        <div className="p-8 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="text-xs font-medium text-neutral-500 uppercase tracking-[0.15em]">
                  {project.category}
                </div>
                <div className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white">
                  {project.status}
                </div>
              </div>
              <motion.div
                className="w-10 h-10 border-2 border-neutral-900 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-4 h-4 text-neutral-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {project.isExternal ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  )}
                </svg>
              </motion.div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-primary leading-tight">
              {project.title}
            </h3>
            
            <p className="text-neutral-700 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs px-3 py-1.5 border border-neutral-300 text-neutral-700 font-medium group-hover:border-neutral-900 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics & CTA */}
        <div className="mt-auto pt-6 border-t-2 border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-3xl font-display font-bold text-primary">
              {project.metrics.stat}
            </div>
            <div className="text-xs text-neutral-600 uppercase tracking-wider font-medium">
              {project.metrics.label}
            </div>
          </div>
          
          <Link
            href={project.link}
            className="inline-flex items-center text-sm font-bold text-primary hover:underline uppercase tracking-wider"
            target={project.isExternal ? '_blank' : undefined}
            rel={project.isExternal ? 'noopener noreferrer' : undefined}
          >
            {project.isExternal ? 'Visit' : 'View'}
            <motion.svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative bg-neutral-50 overflow-hidden">
      {/* Concrete/industrial texture background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

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
              className="mb-6"
            >
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-[0.2em] mb-3">
                ## Selected Works
              </div>
              <div className="h-0.5 w-32 bg-neutral-900" />
            </motion.div>
            
            <motion.p 
              className="text-xl sm:text-2xl text-neutral-700 leading-relaxed max-w-3xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Real projects. Real results. From experimental AI builds to Milwaukee businesses achieving measurable growth.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
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
            className="text-center mt-20 pt-20 border-t-2 border-neutral-900"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-primary">
              Ready to dominate your market?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s create a digital presence that doesn&apos;t just exist—it dominates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#contact"
                className="group px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-neutral-900 transition-all duration-300 inline-flex items-center border-2 border-primary hover:border-neutral-900"
              >
                Start Your Project
                <motion.svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-4 border-2 border-neutral-900 text-primary font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
