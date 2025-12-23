'use client'

import { motion } from 'framer-motion'

const items = [
  { text: 'Web Design', emoji: '🎨' },
  { text: 'SEO', emoji: '🔍' },
  { text: 'E-commerce', emoji: '🛒' },
  { text: 'Branding', emoji: '✨' },
  { text: 'Marketing', emoji: '📈' },
  { text: 'Strategy', emoji: '🎯' },
  { text: 'Development', emoji: '⚡' },
  { text: 'Results', emoji: '🚀' },
]

export default function Marquee() {
  const allItems = [...items, ...items, ...items]

  return (
    <section className="py-6 bg-accent overflow-hidden">
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
              <span className="text-white font-display font-bold text-lg sm:text-xl uppercase tracking-wide px-8 flex items-center gap-3">
                <span>{item.emoji}</span>
                {item.text}
              </span>
              <span className="text-white/40">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
