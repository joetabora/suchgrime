'use client'

import { motion } from 'framer-motion'

const items = [
  'Web Design',
  'SEO',
  'E-commerce',
  'Branding',
  'Marketing',
  'Strategy',
  'Development',
  'Results',
]

export default function Marquee() {
  const allItems = [...items, ...items, ...items]

  return (
    <section className="py-6 bg-neutral-900 overflow-hidden">
      <div 
        className="flex whitespace-nowrap"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <motion.div
          className="flex items-center"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {allItems.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white/80 font-display font-medium text-lg sm:text-xl uppercase tracking-wide px-8">
                {item}
              </span>
              <span className="text-white/20">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
