"use client"

import { type ReactNode } from "react"
import { MotionConfig } from "framer-motion"

interface SiteShellProps {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </>
  )
}
