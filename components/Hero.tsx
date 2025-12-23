'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Base concrete texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-grime-black via-grime-charcoal to-grime-black" />
        
        {/* Grunge overlays */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-grime-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-grime-purple/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-grime-green/5 rounded-full blur-3xl" />
        </div>

        {/* Dripping paint effect */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,200 Q300,150 600,200 T1200,200 L1200,800 L0,800 Z"
              fill="url(#drip-gradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="drip-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff41" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff0044" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-distressed mb-6 distressed-text"
            data-text="SUCH GRIME"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            SUCH GRIME
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-grime-green neon-glow-green max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We drag your outdated site out of the gutter<br className="hidden sm:block" /> and make it dominate Google.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Raw design. Ruthless SEO. Milwaukee-built for small businesses that want to win.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-grime-green text-grime-black font-bold text-lg brutal-border hover:glitch transition-all"
            >
              <span className="relative z-10">Get a Free Site Audit</span>
              <div className="absolute inset-0 bg-grime-green/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/portfolio"
              className="group px-8 py-4 border-3 border-grime-green text-grime-green font-bold text-lg hover:bg-grime-green hover:text-grime-black transition-all brutal-border"
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-grime-green rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-grime-green rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
