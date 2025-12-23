'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth spring animation for the glow
  const glowX = useSpring(cursorX, { stiffness: 50, damping: 20 })
  const glowY = useSpring(cursorY, { stiffness: 50, damping: 20 })
  
  // Faster spring for the dot
  const dotX = useSpring(cursorX, { stiffness: 150, damping: 15 })
  const dotY = useSpring(cursorY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Track hoverable elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, .magnetic')
    
    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [cursorX, cursorY])

  // Don't render on server or touch devices
  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-normal"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[300px] h-[300px] rounded-full bg-gradient-radial from-neutral-200/40 via-neutral-100/20 to-transparent" />
      </motion.div>

      {/* Dot cursor */}
      <motion.div
        className="fixed pointer-events-none z-[10002] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-neutral-900" />
      </motion.div>
    </>
  )
}

