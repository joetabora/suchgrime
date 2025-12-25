'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: 'Doubled our leads in 3 months. Their SEO strategy is exceptional.',
    author: 'Mike Johnson',
    company: 'Milwaukee Plumbing Co.',
    result: '2x leads',
  },
  {
    quote: 'Finally, a website that actually converts. Worth every dollar.',
    author: 'Sarah Chen',
    company: 'Brew City Auto Repair',
    result: '40% revenue increase',
  },
  {
    quote: 'Ranked #1 for our main keyword in 6 months. Outstanding results.',
    author: 'Tom Rodriguez',
    company: 'Lakefront Landscaping',
    result: '#1 Google ranking',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 sm:py-32 relative bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wider mb-6 text-primary">
              Results
            </h2>
            <p className="text-lg text-neutral-600">
              Measurable outcomes from real clients. Here&apos;s what we&apos;ve achieved together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-8 bg-neutral-50 border border-neutral-200"
              >
                <div className="text-3xl font-display font-bold text-neutral-300 mb-6">&quot;</div>
                <p className="text-lg text-neutral-700 mb-8 leading-relaxed">{testimonial.quote}</p>
                <div className="border-t border-neutral-200 pt-6">
                  <div className="font-display font-bold text-primary mb-1">{testimonial.author}</div>
                  <div className="text-sm text-neutral-500 mb-3">{testimonial.company}</div>
                  <div className="text-sm font-medium text-primary">{testimonial.result}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
