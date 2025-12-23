'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [rippleId, setRippleId] = useState(0)

  // Create ripple on click
  const createRipple = useCallback((x: number, y: number) => {
    const newRipple = { id: rippleId, x, y }
    setRipples(prev => [...prev, newRipple])
    setRippleId(prev => prev + 1)
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1000)
  }, [rippleId])

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    
    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('click', handleClick)
    }
  }, [createRipple])

  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Main cursor ripple effect - follows mouse */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 150, damping: 15 },
          y: { type: 'spring', stiffness: 150, damping: 15 },
          opacity: { duration: 0.2 }
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {/* Outer ripple ring */}
        <motion.div
          className="absolute rounded-full border border-neutral-300/50"
          style={{ width: 40, height: 40, translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Inner dot */}
        <div 
          className="w-2 h-2 rounded-full bg-neutral-400"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="w-20 h-20 rounded-full border border-neutral-300" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle trailing ripple */}
      <motion.div
        className="fixed pointer-events-none z-[9996] w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 50, damping: 20 },
          y: { type: 'spring', stiffness: 50, damping: 20 },
        }}
      />
    </>
  )
}
