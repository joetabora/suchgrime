import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Stamp } from "@/components/marketing/stamp"

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
        align === "left" && "printers-margin",
        className,
      )}
    >
      {label && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Stamp>{label}</Stamp>
        </div>
      )}
      <h2 className="display-heading text-4xl text-text md:text-5xl lg:text-6xl letterpress">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">{description}</p>
      )}
      <div className="printer-rule mt-8 w-24" aria-hidden="true" />
    </div>
  )
}
