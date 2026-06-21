"use client"
import { motion } from "framer-motion"
import { studio } from "@/lib/demos/studio"

export function Gallery() {
  return (
    <section id="gallery" className="clip-ink-slant bg-bg-elevated pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="mb-10 flex items-end justify-between gap-6 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-neon">
            Portfolio
          </p>
          <h2 className="font-ink-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
            The Work
          </h2>
        </motion.div>
        <p className="hidden max-w-xs text-right text-sm text-muted md:block">
          Drag to explore — every piece custom, every line intentional.
        </p>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:gap-6 md:px-12">
        {studio.gallery.map((item, i) => (
          <motion.figure
            key={item.caption}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`group relative shrink-0 snap-center overflow-hidden ${
              item.span === "tall"
                ? "h-[420px] w-[280px] md:h-[520px] md:w-[340px]"
                : "h-[420px] w-[320px] md:h-[520px] md:w-[400px]"
            }`}
          >
            <img
              src={item.image}
              alt={item.caption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-neon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-ink-display text-2xl font-semibold uppercase tracking-wide">
                {item.caption}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="mt-6 px-6 font-mono text-xs uppercase tracking-widest text-muted md:hidden">
        ← Swipe to explore →
      </p>
    </section>
  )
}
