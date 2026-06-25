import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

interface DemoBannerProps {
  variant?: "site" | "app"
}

export function DemoBanner({ variant = "site" }: DemoBannerProps) {
  const label = variant === "app" ? "Live App Demo" : "Live Site Demo"
  const pillClass =
    variant === "app"
      ? "rounded-full bg-desk-accent/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-desk-accent"
      : "rounded-full bg-tech/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-tech"

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between border-b border-white/10 bg-bg/90 px-4 text-xs backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          SuchGrime
        </Link>
        <Link
          href="/work"
          className="hidden text-muted transition-colors hover:text-tech sm:inline-flex sm:items-center sm:gap-1"
        >
          Portfolio
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <span className={pillClass}>{label}</span>
    </div>
  )
}
