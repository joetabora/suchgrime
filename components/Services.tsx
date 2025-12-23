'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TiltCard from './TiltCard'

const services = [
  {
    title: 'Website Refreshes',
    description: 'Transform outdated sites into modern, conversion-focused experiences. Clean design meets strategic functionality.',
    icon: '01',
  },
  {
    title: 'Initial SEO Setup',
    description: 'Technical audits, keyword strategy, and on-page optimization. We establish the foundation for search dominance.',
    icon: '02',
  },
  {
    title: 'E-commerce Builds',
    description: 'Full-featured online stores that convert. Payment integration, inventory management, and seamless user experiences.',
    icon: '03',
  },
  {
    title: 'Monthly SEO Maintenance',
    description: 'Ongoing optimization, content updates, and link building. Keep your rankings climbing month after month.',
    icon: '04',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-primary">
              Services
            </h2>
            <p className="text-lg text-neutral-600">
              Comprehensive digital solutions designed to elevate your online presence and drive measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <TiltCard className="group p-8 bg-neutral-50 border border-neutral-200 hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-4xl font-display font-bold text-neutral-300 mb-4 group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-primary">{service.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{service.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
