import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: "glass" | "steel" | "pressed"
}

export function GlassCard({ children, className, hover = false, variant = "glass" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border p-6 backdrop-blur-sm",
        variant === "pressed" && "pressed-card border-white/10",
        variant === "steel" && "steel-surface border-white/10",
        variant === "glass" && "glass glass-border",
        hover && "transition-all duration-300 hover:border-purple/25 hover:shadow-[0_4px_24px_rgba(168,85,247,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
