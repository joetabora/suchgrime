"use client"
import { motion } from "framer-motion"
import { studio } from "@/lib/demos/studio"

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 select-none font-ink-display text-[20rem] font-bold uppercase leading-none text-white/[0.02]">
        INK
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-accent">
              Est. 2015
            </p>
            <h2 className="mt-4 font-ink-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              Built in
              <br />
              <span className="text-ink-accent">the basement</span>
            </h2>
            <blockquote className="mt-10 border-l-4 border-ink-neon pl-6 text-xl leading-relaxed text-text md:text-2xl">
              "{studio.about.story.split(".")[0]}."
            </blockquote>
            <p className="mt-6 max-w-lg text-muted">{studio.about.story}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center gap-0 lg:col-span-5"
          >
            {studio.about.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline justify-between border-b border-white/10 py-6 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {stat.label}
                </span>
                <span className="font-ink-display text-4xl font-bold uppercase text-ink-accent md:text-5xl">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
