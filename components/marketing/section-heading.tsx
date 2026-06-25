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
      {label && <p className="text-label mb-2">{label}</p>}
      <h2 className="font-display text-4xl tracking-wide text-text md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{description}</p>
      )}
    </div>
  )
}
