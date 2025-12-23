'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const testimonials = [
  {
    quote: "SuchGrime completely transformed our online presence. Our traffic is up 300% and our leads have doubled. They are not just a vendor—they are a growth partner.",
    name: "Mike Richardson",
    title: "Owner, Richardson Auto",
  },
  {
    quote: "I was skeptical about investing in a new website, but the ROI has been incredible. Within 3 months we were ranking on page 1 for our target keywords.",
    name: "Sarah Chen",
    title: "Founder, Chen Consulting",
  },
  {
    quote: "The team at SuchGrime actually listens and delivers. No BS, no endless meetings—just results. Our e-commerce sales increased 150% after the redesign.",
    name: "David Park",
    title: "CEO, Park Fitness",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 sm:py-32 bg-neutral-900 text-white overflow-hidden relative">
      {/* Floating abstract shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-neutral-800 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-24 h-24 border border-neutral-800"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -45, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-16 h-16 bg-neutral-800 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <svg className="w-16 h-16 mx-auto text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>

          {/* Testimonial content */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed mb-8 text-neutral-300">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-neutral-500">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-neutral-700 hover:bg-neutral-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
