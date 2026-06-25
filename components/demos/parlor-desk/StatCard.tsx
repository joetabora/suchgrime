"use client"
interface StatCardProps {
  label: string
  value: number | string
  hint?: string
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="glass glass-border group relative overflow-hidden rounded-lg border p-5 backdrop-blur-sm transition-colors hover:border-desk-accent/40">
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-desk-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}
