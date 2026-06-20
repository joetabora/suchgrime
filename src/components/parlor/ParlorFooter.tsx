import { parlor } from "../../data/parlor"

export function ParlorFooter() {
  return (
    <footer className="border-t border-white/10 bg-bg-elevated">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-4 border-x border-white/10 px-6 py-6 text-sm text-muted md:grid-cols-3 md:px-8">
        <p className="font-display text-xl tracking-wider text-text">
          {parlor.name.toUpperCase()}{" "}
          <span className="text-parlor-accent">{parlor.subtitle.toUpperCase()}</span>
        </p>
        <p className="text-center font-mono text-[10px] uppercase tracking-widest">
          {parlor.domain}
        </p>
        <p className="text-right font-mono text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} · Built with the stack we ship
        </p>
      </div>
    </footer>
  )
}
