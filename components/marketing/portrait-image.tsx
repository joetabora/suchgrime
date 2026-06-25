"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

interface PortraitImageProps {
  className?: string
  priority?: boolean
}

export function PortraitImage({ className, priority = false }: PortraitImageProps) {
  const [hasError, setHasError] = useState(false)
  const { image, name } = siteConfig.aboutJoe

  if (hasError) {
    return (
      <div
        className={cn(
          "flex aspect-[4/5] w-full items-center justify-center rounded-sm border border-purple/30 bg-gradient-to-br from-bg-elevated to-purple/15",
          className,
        )}
      >
        <span className="display-heading text-6xl text-purple/50">{name.charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={cn("duotone-grain relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10", className)}>
      <Image
        src={image}
        alt={`${name}, founder of SuchGrime`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        onError={() => setHasError(true)}
        priority={priority}
      />
    </div>
  )
}
