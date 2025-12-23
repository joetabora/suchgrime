'use client'

import { motion } from 'framer-motion'

const items = [
  '✦ Award-Winning Design',
  '✦ SEO Excellence',
  '✦ Milwaukee Based',
  '✦ 10+ Years Experience',
  '✦ Data-Driven Results',
  '✦ Custom Solutions',
  '✦ Fast Turnaround',
  '✦ Proven ROI',
]

export default function Marquee() {
  // Duplicate items for seamless loop
  const allItems = [...items, ...items]

  return (
    <section className="py-8 bg-neutral-50 border-y border-neutral-200 overflow-hidden">
      <div 
        className="flex whitespace-nowrap"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {allItems.map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-900 transition-colors cursor-default">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

