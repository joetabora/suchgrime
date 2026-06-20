import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { studio } from "../../data/studio"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      <img
        src={studio.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      <div className="absolute inset-0 bg-ink-accent/10 mix-blend-multiply" />

      <div className="relative z-10 px-6 pb-32 pt-40 md:px-12 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-[1400px]"
        >
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="border border-ink-neon/50 bg-ink-neon/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-neon">
              Custom Only
            </span>
            <span className="border border-ink-accent/50 bg-ink-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-accent">
              18+
            </span>
          </div>

          <h1 className="font-ink-display text-[clamp(3rem,12vw,9rem)] font-bold uppercase leading-[0.85] tracking-tight text-text">
            {studio.heroHeadline.split(" ").map((word, i) => (
              <span
                key={word}
                className={`block ${i === 2 ? "text-ink-accent" : ""}`}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-md font-mono text-sm uppercase tracking-wider text-muted">
            {studio.tagline}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 border-t border-white/10 bg-bg/90 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
          <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {studio.heroSubtext}
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="#gallery"
              className="bg-ink-accent px-8 py-3 font-ink-display text-sm font-semibold uppercase tracking-widest text-text transition-colors hover:bg-ink-accent-hover"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="border border-white/20 px-8 py-3 font-ink-display text-sm font-semibold uppercase tracking-widest transition-colors hover:border-ink-accent hover:text-ink-accent"
            >
              Book Consult
            </a>
          </div>
        </div>
      </motion.div>

      <a
        href="#gallery"
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-ink-accent"
        aria-label="Scroll to gallery"
      >
        <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
