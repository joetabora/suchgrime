'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const services = [
  {
    title: 'Website Refreshes',
    description: 'Transform your outdated site into a conversion machine. Modern design meets brutal performance.',
    icon: '💀',
    color: 'green',
  },
  {
    title: 'Initial SEO Setup',
    description: 'Technical audits, keyword strategy, on-page optimization. We set the foundation for domination.',
    icon: '⚡',
    color: 'red',
  },
  {
    title: 'E-commerce Builds',
    description: 'Full-featured online stores that convert. Payment integration, inventory management, the works.',
    icon: '🔥',
    color: 'purple',
  },
  {
    title: 'Monthly SEO Maintenance',
    description: 'Ongoing optimization, content updates, link building. Keep your rankings climbing.',
    icon: '📈',
    color: 'green',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 font-distressed distressed-text text-center">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const colorClasses = {
                green: 'border-grime-green hover:border-grime-green',
                red: 'border-grime-red hover:border-grime-red',
                purple: 'border-grime-purple hover:border-grime-purple',
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`brutal-border p-8 bg-grime-charcoal cursor-pointer transition-all ${
                    colorClasses[service.color as keyof typeof colorClasses]
                  } ${hoveredIndex === index ? 'glitch' : ''}`}
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
