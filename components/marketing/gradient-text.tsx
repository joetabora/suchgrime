import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: "span" | "p"
}

export function GradientText({ children, className, as: Tag = "span" }: GradientTextProps) {
  return <Tag className={cn("text-parlor-accent", className)}>{children}</Tag>
}
