import { studio } from "../../data/studio"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 text-center md:px-12">
        <p className="font-ink-display text-2xl font-bold uppercase tracking-[0.2em]">
          Deadset <span className="text-ink-accent">Ink</span>
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {studio.tagline} · {studio.location.email}
        </p>
        <p className="text-xs text-muted/60">
          © {new Date().getFullYear()} {studio.name}. 18+ only.
        </p>
      </div>
    </footer>
  )
}
