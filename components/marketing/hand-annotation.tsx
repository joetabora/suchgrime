"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { inkDraw } from "@/components/marketing/motion"

type AnnotationKind = "underline" | "circle" | "arrow"

interface HandAnnotationProps {
  kind?: AnnotationKind
  className?: string
  color?: string
}

export function HandAnnotation({ kind = "underline", className, color = "rgba(168, 85, 247, 0.7)" }: HandAnnotationProps) {
  if (kind === "circle") {
    return (
      <svg
        className={cn("pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]", className)}
        viewBox="0 0 200 60"
        fill="none"
        aria-hidden="true"
      >
        <motion.ellipse
          cx="100"
          cy="30"
          rx="95"
          ry="26"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          {...inkDraw}
        />
      </svg>
    )
  }

  if (kind === "arrow") {
    return (
      <svg
        className={cn("pointer-events-none h-6 w-12", className)}
        viewBox="0 0 48 24"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M2 12 C 12 4, 28 20, 42 12 M 36 8 L 42 12 L 36 16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...inkDraw}
        />
      </svg>
    )
  }

  return (
    <svg
      className={cn("pointer-events-none absolute -bottom-2 left-0 h-3 w-full", className)}
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M2 8 C 40 2, 80 10, 120 6 S 180 4, 198 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...inkDraw}
      />
    </svg>
  )
}
