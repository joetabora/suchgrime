'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
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
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-8"
          >
            🤝
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6 leading-tight">
            Great brands<br />
            <span className="text-accent">don&apos;t just happen.</span>
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
              className="group px-10 py-5 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary-light transition-all duration-300 inline-flex items-center gap-3"
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
              className="text-neutral-500 hover:text-primary transition-colors font-medium"
            >
              or email hello@suchgrime.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

