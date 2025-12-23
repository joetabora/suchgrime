'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-neutral-100 blur-3xl"
          style={{ top: '-20%', right: '-10%' }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-neutral-900 mb-6 leading-[0.9] tracking-wide">
            GREAT BRANDS<br />
            <span className="text-neutral-400">DON&apos;T JUST HAPPEN.</span>
          </h2>

          <p className="text-xl sm:text-2xl text-neutral-600 mb-4 font-medium">
            We build them.
          </p>

          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto">
            Ready to stop blending in and start standing out? 
            Let&apos;s talk about turning your business into the go-to choice in your market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton
              as="a"
              href="/contact"
              className="group px-10 py-5 bg-neutral-900 text-white font-bold text-lg rounded-full hover:bg-neutral-800 transition-all duration-300 inline-flex items-center gap-3"
            >
              Let&apos;s Chat
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MagneticButton>
            <a 
              href="mailto:hello@suchgrime.com"
              className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
            >
              or email hello@suchgrime.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
