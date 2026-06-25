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
          "flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-purple/30 bg-gradient-to-br from-bg-elevated to-purple/20",
          className,
        )}
      >
        <span className="font-display text-6xl tracking-wide text-purple/60">{name.charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10", className)}>
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
