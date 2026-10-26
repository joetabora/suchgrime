"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  image: string;
  kicker: string;
  title: string;
  text?: string;
  href: string;
  cta: string;
};

const INTERVAL_MS = 6500;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused, count, go]);

  return (
    <section
      className="relative h-[78vh] min-h-[520px] overflow-hidden rounded-[2rem] bg-ink text-paper"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.href + i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={i !== index}
          aria-roledescription="slide"
        >
          <Image src={slide.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 pb-16 md:p-14 md:pb-20">
            <span className="ribbon">{slide.kicker}</span>
            <h2 className="mt-4 max-w-4xl font-goth text-5xl leading-[0.95] md:text-8xl">{slide.title}</h2>
            {slide.text && <p className="mt-4 max-w-xl text-paper/85 md:text-lg">{slide.text}</p>}
            <Link href={slide.href} tabIndex={i === index ? 0 : -1} className="btn-mustard mt-7">
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {count > 1 && (
        <div className="absolute bottom-5 right-5 flex items-center gap-3 md:bottom-8 md:right-10">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-mustard" : "w-2 bg-paper/50 hover:bg-paper"}`}
              />
            ))}
          </div>
          <button onClick={() => go(index - 1)} aria-label="Previous slide" className="rounded-full border border-paper/40 p-2 hover:bg-paper hover:text-ink">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(index + 1)} aria-label="Next slide" className="rounded-full border border-paper/40 p-2 hover:bg-paper hover:text-ink">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
