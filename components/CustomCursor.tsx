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
  const [trailRipples, setTrailRipples] = useState<Ripple[]>([])

  // Create ripple on click
  const createRipple = useCallback((x: number, y: number) => {
    const newRipple = { id: rippleId, x, y }
    setRipples(prev => [...prev, newRipple])
    setRippleId(prev => prev + 1)
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1200)
  }, [rippleId])

  // Create trail ripples as mouse moves
  const createTrailRipple = useCallback((x: number, y: number) => {
    const newRipple = { id: Date.now() + Math.random(), x, y }
    setTrailRipples(prev => [...prev.slice(-5), newRipple])
    
    setTimeout(() => {
      setTrailRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    let lastTrailTime = 0
    const trailInterval = 100 // Create trail ripple every 100ms

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      // Create trail ripples at intervals
      const now = Date.now()
      if (now - lastTrailTime > trailInterval) {
        createTrailRipple(e.clientX, e.clientY)
        lastTrailTime = now
      }
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
  }, [createRipple, createTrailRipple])

  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Trail ripples - water effect following cursor */}
      <AnimatePresence>
        {trailRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9995]"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ scale: 0.5, opacity: 0.4 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              className="w-8 h-8 rounded-full border border-neutral-400/60"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor with concentric ripple rings */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 500, damping: 28 },
          y: { type: 'spring', stiffness: 500, damping: 28 },
          opacity: { duration: 0.2 }
        }}
      >
        {/* Ripple ring 1 */}
        <motion.div
          className="absolute rounded-full border-2 border-neutral-400/40"
          style={{ 
            width: 50, 
            height: 50, 
            left: '50%',
            top: '50%',
            translateX: '-50%', 
            translateY: '-50%' 
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        
        {/* Ripple ring 2 - offset timing */}
        <motion.div
          className="absolute rounded-full border border-neutral-400/30"
          style={{ 
            width: 50, 
            height: 50, 
            left: '50%',
            top: '50%',
            translateX: '-50%', 
            translateY: '-50%' 
          }}
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.5,
          }}
        />

        {/* Ripple ring 3 - offset timing */}
        <motion.div
          className="absolute rounded-full border border-neutral-300/20"
          style={{ 
            width: 50, 
            height: 50, 
            left: '50%',
            top: '50%',
            translateX: '-50%', 
            translateY: '-50%' 
          }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 1,
          }}
        />

        {/* Center dot */}
        <div 
          className="absolute w-3 h-3 rounded-full bg-neutral-500"
          style={{ 
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)' 
          }}
        />
      </motion.div>

      {/* Click ripples - bigger splash effect */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          >
            {/* Multiple expanding rings for splash effect */}
            <motion.div
              className="absolute rounded-full border-2 border-neutral-500/50"
              style={{ 
                width: 20, 
                height: 20, 
                left: '50%',
                top: '50%',
                translateX: '-50%', 
                translateY: '-50%' 
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute rounded-full border border-neutral-400/40"
              style={{ 
                width: 20, 
                height: 20, 
                left: '50%',
                top: '50%',
                translateX: '-50%', 
                translateY: '-50%' 
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            />
            <motion.div
              className="absolute rounded-full border border-neutral-300/30"
              style={{ 
                width: 20, 
                height: 20, 
                left: '50%',
                top: '50%',
                translateX: '-50%', 
                translateY: '-50%' 
              }}
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 12, opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
