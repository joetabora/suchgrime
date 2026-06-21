import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DemoBannerProps {
  variant?: "site" | "app"
}

export function DemoBanner({ variant = "site" }: DemoBannerProps) {
  const label = variant === "app" ? "Live App Demo" : "Live Demo"
  const pillClass =
    variant === "app"
      ? "rounded-full bg-desk-accent/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-desk-accent"
      : "rounded-full bg-accent/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent"

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between border-b border-white/5 bg-surface px-4 text-xs">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to SuchGrime
      </Link>
      <span className={pillClass}>{label}</span>
    </div>
  )
}
