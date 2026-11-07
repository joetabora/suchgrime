"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const BUILDS = [
  {
    when: "Thursday",
    where: "South Side",
    title: "Rigid Panhead",
    note: "Forks are still on the floor. Paint can wait until she actually runs.",
    next: "Kick the rake this weekend and see if she tracks.",
  },
  {
    when: "Last week",
    where: "Bay View",
    title: "Shovelhead",
    note: "Cases are open. Pretty sure the bushing is in a coffee can.",
    next: "Dig through the bench before ordering another one.",
  },
  {
    when: "February",
    where: "Walker's Point",
    title: "Ironhead",
    note: "New neck's in. The frame kept its dents. That's fine.",
    next: "Wheels on, then a slow loop around the block.",
  },
];

const HAPPENING = [
  {
    kicker: "Next ride",
    title: "Lakeshore Run",
    text: "Jun 13 · Milwaukee lakefront",
    href: "/events",
    action: "I'm rolling",
  },
  {
    kicker: "On the bench",
    title: "Panhead forks",
    text: "Still on the floor in the South Side stand.",
    href: "/builds",
    action: "Read the note",
  },
  {
    kicker: "Out of the garage",
    title: "Instagram",
    text: "Photos when we're actually out riding.",
    href: null,
    action: "Soon",
  },
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
    badge: "Drop",
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
        className="mx-auto flex max-w-[1440px] flex-col justify-center px-4 py-12 md:px-8 md:py-16"
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
          className="mt-3 font-bebas text-[clamp(4.2rem,11vw,7.75rem)] leading-[0.82] tracking-tight"
        >
          RIDE UGLY.
          <span className="mt-1 block text-[0.78em] leading-none text-gold">DIE PRETTY.</span>
        </motion.h1>
        <motion.div
          variants={fade(reduce)}
          className="mt-6 flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-sm text-base leading-relaxed text-secondary">
            Been out back on milk crates all week. She fired up Thursday. Figured that was enough for a ride.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/shop" className="btn-blood">
              Shop the drop
            </Link>
            <Link
              href="/builds"
              className="font-display text-xs uppercase tracking-[0.18em] text-chrome hover:text-gold"
            >
              See the bikes
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-12">
          <Reveal className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Limited drop</p>
              <h2 className="mt-1 font-bebas text-6xl leading-[0.82] tracking-tight md:text-7xl">
                Drop <span className="text-gold">01</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <p className="max-w-xs text-sm leading-relaxed text-secondary">
                Small run. When it&apos;s gone, it&apos;s gone.
              </p>
              <Link href="/shop" className="btn-blood">
                Shop the drop
              </Link>
            </div>
          </Reveal>
          <div
            className={`grid gap-4 ${pieces.length > 1 ? "sm:grid-cols-2" : ""} ${pieces.length > 2 ? "lg:grid-cols-3" : ""}`}
          >
            {pieces.map((piece, index) => (
              <Reveal key={`${piece.href}-${piece.title}`} delay={index * 0.05}>
                <DropCard piece={piece} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-12">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">In the garage</p>
              <h2 className="mt-1 font-bebas text-6xl leading-[0.82] tracking-tight md:text-7xl">Builds</h2>
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
              <Reveal key={build.title} delay={index * 0.05} className="h-full">
                <Link
                  href="/builds"
                  className="flex h-full flex-col border border-line bg-surface px-5 py-5 transition-colors hover:bg-elevated md:px-6 md:py-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{build.when}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">{build.where}</p>
                  </div>
                  <h3 className="mt-5 font-bebas text-4xl leading-none tracking-tight md:text-5xl">{build.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{build.note}</p>
                  <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-primary">{build.next}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-12">
          <Reveal className="mb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">What&apos;s happening</p>
            <h2 className="mt-1 font-bebas text-5xl leading-none tracking-tight md:text-6xl">Around the shop</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {HAPPENING.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <HappeningCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DropCard({ piece }: { piece: DropPiece }) {
  const label =
    piece.badge === "Limited" || piece.badge === "Sold out" || piece.badge === "Coming soon"
      ? piece.badge
      : "Drop";
  const limited = label === "Limited";

  return (
    <Link href={piece.href} className="group flex h-full flex-col border border-line bg-surface">
      <div className="relative aspect-[4/5] overflow-hidden bg-elevated">
        {piece.image ? (
          <Image
            src={piece.image}
            alt={piece.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <FlashPlate />
        )}
        <span
          className={`absolute left-3 top-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
            limited ? "bg-gold text-[var(--color-base)]" : "bg-primary text-[var(--color-base)]"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-line bg-primary px-4 py-3.5 text-[var(--color-base)]">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-base)_62%,transparent)]">
            {piece.detail}
          </p>
          <h3 className="mt-1 font-bebas text-[1.7rem] leading-[0.9] tracking-tight md:text-3xl">{piece.title}</h3>
        </div>
        <p className="shrink-0 font-display text-base tracking-wide">{piece.price}</p>
      </div>
    </Link>
  );
}

function HappeningCard({
  item,
}: {
  item: { kicker: string; title: string; text: string; href: string | null; action: string };
}) {
  const body = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">{item.kicker}</p>
      <h3 className="mt-3 font-bebas text-4xl leading-none tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{item.text}</p>
      <p className="mt-4 font-display text-xs uppercase tracking-[0.16em] text-chrome">{item.action}</p>
    </>
  );

  if (!item.href) {
    return <div className="flex h-full flex-col border border-line bg-surface px-5 py-5">{body}</div>;
  }

  return (
    <Link href={item.href} className="flex h-full flex-col border border-line bg-surface px-5 py-5 transition-colors hover:bg-elevated">
      {body}
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
      <rect width="240" height="320" fill="#322C26" />
      <path d="M28 58 H212 L196 92 H44 Z" fill="#C6A35A" />
      <path d="M108 104 L120 268 L132 104 Z" fill="#E7E0D4" />
      <rect x="62" y="96" width="116" height="14" fill="#F4EFE6" />
      <rect x="104" y="110" width="32" height="28" fill="#C6A35A" />
    </svg>
  );
}
