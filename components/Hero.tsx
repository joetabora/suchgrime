'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import MagneticButton from './MagneticButton'

const rotatingWords = ['LAUNCH', 'GROW', 'DOMINATE', 'CONVERT']

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating gradient orbs - subtle greys with enhanced parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-neutral-200/30 blur-3xl"
          style={{ top: '10%', right: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-neutral-100/50 blur-3xl"
          style={{ bottom: '10%', left: '-5%' }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Additional floating elements for depth */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-neutral-300/20 blur-2xl"
          style={{ top: '50%', left: '50%' }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-neutral-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-1 h-1 bg-neutral-300 rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main heading with rotating text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-display leading-[0.85] tracking-wide">
              <span className="block text-neutral-900">WE HELP</span>
              <span className="block text-neutral-900">BUSINESSES</span>
              <span className="block relative h-[1em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ y: 60, opacity: 0, rotateX: -45 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -60, opacity: 0, rotateX: 45 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 text-neutral-400"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {rotatingWords[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-neutral-500 max-w-2xl mb-12 leading-relaxed"
          >
            Web design, SEO, and marketing that actually works.{' '}
            <span className="text-neutral-900 font-medium">No fluff, just results.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="group px-8 py-4 bg-neutral-900 text-white font-semibold text-lg rounded-full hover:bg-neutral-800 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Let&apos;s Talk
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#work"
              className="px-8 py-4 bg-white text-neutral-900 font-semibold text-lg rounded-full border-2 border-neutral-200 hover:border-neutral-400 transition-all duration-300 inline-flex items-center justify-center"
            >
              See Our Work
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

