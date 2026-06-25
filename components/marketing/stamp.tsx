import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StampProps {
  children: ReactNode
  className?: string
  rotate?: "left" | "right" | "none"
}

export function Stamp({ children, className, rotate = "left" }: StampProps) {
  return (
    <span
      className={cn(
        "ink-stamp inline-block font-body text-[11px] font-semibold tracking-[0.12em] text-muted",
        rotate === "left" && "-rotate-1",
        rotate === "right" && "rotate-1",
        className,
      )}
    >
      {children}
    </span>
  )
}
