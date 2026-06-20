import { type ReactNode } from "react"
import { MotionConfig } from "framer-motion"

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="noise-overlay" aria-hidden="true" />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </>
  )
}
