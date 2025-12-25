'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Warehouse texture background */}
      <div className="absolute inset-0 bg-neutral-900 opacity-[0.02]" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wider text-primary mb-4">
              Milwaukee-Built. Results-Driven.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  <strong className="text-primary">SuchGrime</strong> is a Milwaukee-based web design and SEO agency focused on dragging outdated sites into the modern era. We specialize in refreshes that look sharp, convert better, and crush Google rankings for small service businesses.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Powered by cutting-edge tools (including AI like Cursor for rapid, high-quality builds), we deliver transparent pricing and real results – no agency fluff, no hidden fees.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  <strong className="text-primary">Founded on Rust Belt hustle:</strong> we build digital assets that work as hard as you do.
                </p>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="relative p-6 bg-white border border-neutral-200 group hover:border-primary transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <div className="text-3xl font-display font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-neutral-600">Transparent Pricing</div>
                </div>
                <div className="relative p-6 bg-white border border-neutral-200 group hover:border-primary transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <div className="text-3xl font-display font-bold text-primary mb-2">AI</div>
                  <div className="text-sm text-neutral-600">Powered Tools</div>
                </div>
              </div>
            </motion.div>

            {/* Founder photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Distressed border effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-neutral-200 to-neutral-300 transform rotate-1" />
                <div className="absolute -inset-2 bg-white transform -rotate-1" />
                
                {/* Photo container */}
                <div className="relative bg-neutral-100 overflow-hidden border-2 border-neutral-900">
                  <Image
                    src="/me.PNG"
                    alt="SuchGrime founder – Milwaukee web design expert"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                  {/* Grain overlay on photo */}
                  <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
