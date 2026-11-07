"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STRIP = ["Small runs", "Long forks", "Garage days", "Milwaukee"];

const BUILDS = [
  {
    when: "Thursday",
    where: "South Side",
    title: "Rigid Panhead",
    note: "Forks are still on the floor. Paint can wait until she actually runs.",
  },
  {
    when: "Last week",
    where: "Bay View",
    title: "Shovelhead",
    note: "Cases are open. Pretty sure the bushing is in a coffee can.",
  },
  {
    when: "February",
    where: "Walker's Point",
    title: "Ironhead",
    note: "New neck's in. The frame kept its dents. That's fine.",
  },
];

const EVENTS = [
  { date: "06.13", title: "Lakeshore Run", place: "Milwaukee lakefront" },
  { date: "08.07", title: "Garage Night", place: "Walker's Point" },
];

const FALLBACK_DROP: DropPiece[] = [
  {
    href: "/shop",
    title: "Flash Tee",
    price: "Soon",
    image: null,
    badge: "Limited",
    detail: "Chest hit",
  },
  {
    href: "/shop",
    title: "Next off the press",
    price: "Soon",
    image: null,
    badge: "Drop 01",
    detail: "Small run",
  },
];

export type DropPiece = {
  href: string;
  title: string;
  price: string;
  image: string | null;
  badge: string;
  detail: string;
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function HomeView({ drop }: { drop: DropPiece[] }) {
  const reduce = useReducedMotion();
  const pieces = drop.length > 0 ? drop : FALLBACK_DROP;

  return (
    <div className="overflow-x-hidden">
      <motion.section
        className="flex min-h-[78svh] flex-col justify-center px-4 py-16 md:px-8 md:py-20"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
        }}
      >
        <motion.p
          variants={fade(reduce)}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold"
        >
          Milwaukee · Wis
        </motion.p>
        <motion.h1
          variants={fade(reduce)}
          className="mt-4 font-bebas text-[clamp(4.4rem,13vw,8.5rem)] leading-[0.84] tracking-tight"
        >
          RIDE UGLY.
          <span className="mt-1 block text-gold">DIE PRETTY.</span>
        </motion.h1>
        <motion.p
          variants={fade(reduce)}
          className="mt-6 max-w-md text-base leading-relaxed text-secondary md:text-lg"
        >
          Been out back on milk crates all week. She fired up Thursday. Figured that was enough for a ride.
        </motion.p>
        <motion.div variants={fade(reduce)} className="mt-8 flex flex-wrap items-center gap-6">
          <Link href="/shop" className="btn-blood">
            Shop the drop
          </Link>
          <Link
            href="/builds"
            className="font-display text-xs uppercase tracking-[0.18em] text-chrome hover:text-gold"
          >
            See the bikes
          </Link>
        </motion.div>
        <motion.p
          variants={fade(reduce)}
          className="mt-12 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary"
        >
          {STRIP.join("  ·  ")}
        </motion.p>
      </motion.section>

      <section className="border-t border-line bg-base">
        <div className="grid lg:grid-cols-[minmax(16rem,0.7fr)_1.5fr]">
          <Reveal className="flex flex-col border-b border-line px-4 py-8 md:px-8 lg:border-r lg:border-b-0 lg:py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Limited drop</p>
            <h2 className="mt-2 font-bebas text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.78] tracking-tight">
              DROP
              <span className="text-gold"> 01</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">
              Small run. When it&apos;s gone, it&apos;s gone.
            </p>
            <Link href="/shop" className="btn-blood mt-8 w-fit">
              Shop the drop
            </Link>
          </Reveal>

          <div className={`grid gap-px bg-line ${pieces.length > 1 ? "sm:grid-cols-2" : ""} ${pieces.length > 2 ? "xl:grid-cols-3" : ""}`}>
            {pieces.map((piece, index) => (
              <Reveal key={`${piece.href}-${piece.title}`} delay={index * 0.05} className="min-h-0 bg-base">
                <DropCard piece={piece} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">In the garage</p>
              <h2 className="mt-2 font-bebas text-5xl leading-[0.85] tracking-tight md:text-7xl">Builds</h2>
            </div>
            <Link
              href="/builds"
              className="font-display text-xs uppercase tracking-[0.18em] text-chrome hover:text-gold"
            >
              All the notes
            </Link>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {BUILDS.map((build, index) => (
              <Reveal key={build.title} delay={index * 0.05}>
                <Link href="/builds" className="flex h-full flex-col bg-surface px-5 py-6 transition-colors hover:bg-elevated">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    {build.when} · {build.where}
                  </p>
                  <h3 className="mt-4 font-bebas text-4xl leading-none tracking-tight">{build.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{build.note}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 md:px-8 md:py-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">On the road</p>
            <h2 className="mt-2 font-bebas text-6xl leading-[0.82] md:text-7xl">Upcoming</h2>
          </Reveal>
          <div className="lg:col-span-8">
            {EVENTS.map((event, index) => (
              <Reveal key={event.date} delay={index * 0.05}>
                <article className="grid items-end gap-4 border-t border-line py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                  <p className="font-bebas text-5xl leading-none text-gold md:text-6xl">{event.date}</p>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide">{event.title}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      {event.place}
                    </p>
                  </div>
                  <Link href="/events" className="btn-outline justify-self-start sm:justify-self-end">
                    I&apos;m Rolling
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DropCard({ piece }: { piece: DropPiece }) {
  return (
    <Link href={piece.href} className="group flex h-full flex-col bg-surface">
      <div className="relative aspect-[4/5] overflow-hidden bg-elevated">
        {piece.image ? (
          <Image
            src={piece.image}
            alt={piece.title}
            fill
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <FlashPlate />
        )}
        <span className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-base)]">
          {piece.badge}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 bg-primary px-4 py-3 text-[var(--color-base)]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-base)_62%,transparent)]">
            {piece.detail}
          </p>
          <h3 className="mt-1 font-bebas text-3xl leading-none tracking-tight">{piece.title}</h3>
        </div>
        <p className="shrink-0 font-display text-sm">{piece.price}</p>
      </div>
    </Link>
  );
}

function fade(reduce: boolean | null) {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
}

function FlashPlate() {
  return (
    <svg viewBox="0 0 240 320" className="h-full w-full" aria-hidden>
      <rect width="240" height="320" fill="#141414" />
      <path d="M28 58 H212 L196 92 H44 Z" fill="#C41E3A" />
      <path d="M108 104 L120 268 L132 104 Z" fill="#E8E8E8" />
      <rect x="62" y="96" width="116" height="14" fill="#D4AF37" />
      <rect x="104" y="110" width="32" height="28" fill="#D4AF37" />
    </svg>
  );
}
