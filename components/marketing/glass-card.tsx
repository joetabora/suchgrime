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
        "glass glass-border rounded-lg border p-6 backdrop-blur-sm",
        hover && "transition-colors hover:border-tech/30 hover:bg-white/[0.06]",
        className,
      )}
    >
      {children}
    </div>
  )
}
