'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: 'Doubled our leads in 3 months. Their SEO game is ruthless.',
    author: 'Mike Johnson',
    company: 'Milwaukee Plumbing Co.',
    result: '2x leads',
  },
  {
    quote: 'Finally, a site that actually converts. Worth every penny.',
    author: 'Sarah Chen',
    company: 'Brew City Auto Repair',
    result: '40% revenue increase',
  },
  {
    quote: 'Ranked #1 for our main keyword in 6 months. Unreal.',
    author: 'Tom Rodriguez',
    company: 'Lakefront Landscaping',
    result: '#1 Google ranking',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 font-distressed distressed-text text-center">
            Proof.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="brutal-border p-8 bg-grime-charcoal"
              >
                <div className="text-4xl mb-4 text-grime-green">"</div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="border-t border-grime-charcoal pt-4">
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.company}</div>
                  <div className="text-sm text-grime-green font-bold mt-2">{testimonial.result}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
