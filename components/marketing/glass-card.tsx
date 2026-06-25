import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: "glass" | "steel"
}

export function GlassCard({ children, className, hover = false, variant = "glass" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 backdrop-blur-sm",
        variant === "steel" ? "steel-surface border-white/10" : "glass glass-border",
        hover && "transition-colors hover:border-purple/30 hover:bg-white/[0.06]",
        className,
      )}
    >
      {children}
    </div>
  )
}
