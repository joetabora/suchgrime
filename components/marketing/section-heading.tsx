import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label?: string
  title: ReactNode
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && <p className="text-label mb-3">{label}</p>}
      <h2 className="font-display text-4xl tracking-wide text-text md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted md:text-xl">{description}</p>
      )}
    </div>
  )
}
