'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as = 'button',
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * strength, y: y * strength })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const Component = as === 'a' ? motion.a : motion.button

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{
        boxShadow: isHovered ? '0 10px 40px -10px rgba(0,0,0,0.15)' : '0 0 0 0 rgba(0,0,0,0)',
      }}
      className={`magnetic ${className}`}
    >
      {children}
    </Component>
  )
}

