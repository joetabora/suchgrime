"use client"
import { shop } from "@/lib/demos/shop"

export function Marquee() {
  const phrases = [...shop.marqueePhrases, ...shop.marqueePhrases]

  return (
    <div className="overflow-hidden border-y border-white/5 bg-accent py-4" aria-hidden="true">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {phrases.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="font-display text-2xl tracking-[0.15em] text-bg md:text-3xl"
          >
            {phrase}
            <span className="mx-6 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
