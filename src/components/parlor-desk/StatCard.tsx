interface StatCardProps {
  label: string
  value: number | string
  hint?: string
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}
