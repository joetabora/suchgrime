import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "border border-white/10 bg-surface p-6",
        hover && "transition-colors hover:border-parlor-accent/30",
        className,
      )}
    >
      {children}
    </div>
  )
}
