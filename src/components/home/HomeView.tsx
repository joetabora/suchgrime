"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STRIP = ["Small run", "Flash sheets", "Long forks", "Milwaukee", "No reorders"];

const BUILDS = [
  {
    index: "01",
    stamp: "Not done",
    when: "04.12",
    where: "South Side",
    title: "Rigid Panhead",
    note: "Neck rake still wrong. Forks on the floor. Don't touch the paint.",
  },
  {
    index: "02",
    stamp: "On the bench",
    when: "03.28",
    where: "Bay View",
    title: "Shovelhead",
    note: "Cases open. Missing a cam bushing. Again. Parts in a coffee can.",
  },
  {
    index: "03",
    stamp: "In the jig",
    when: "02.02",
    where: "Walker's Point",
    title: "Ironhead",
    note: "New neck in. Old sins still in the frame. Welds ground, not pretty.",
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
        className="grit relative flex min-h-[calc(100svh-3.5rem)] flex-col"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
        }}
      >
        <CropMarks />
        <motion.div
          variants={fade(reduce)}
          className="relative z-10 flex items-start justify-between gap-6 px-4 pt-6 md:px-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
            Milwaukee · Wis
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-secondary sm:block">
            Not a show bike
          </p>
        </motion.div>

        <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-6 md:px-8">
          <motion.p
            variants={fade(reduce)}
            className="font-goth text-4xl text-blood md:text-5xl"
          >
            Such
          </motion.p>
          <motion.h1
            variants={fade(reduce)}
            className="font-bebas text-[clamp(4.4rem,14vw,9.25rem)] leading-[0.8] tracking-tight"
          >
            RIDE UGLY.
            <span className="mt-1 block text-blood md:pl-[14vw]">DIE PRETTY.</span>
          </motion.h1>
          <motion.p
            variants={fade(reduce)}
            className="mt-5 max-w-md border-l-2 border-blood pl-4 text-base leading-snug text-primary md:text-lg"
          >
            South Side stand. Milk crates for a seat. She fired on Thursday. That&apos;s enough.
          </motion.p>
          <motion.div variants={fade(reduce)} className="mt-6 flex flex-wrap items-center gap-6">
            <Link href="/shop" className="btn-blood">
              Shop the drop
            </Link>
            <Link
              href="/builds"
              className="font-display text-xs uppercase tracking-[0.2em] text-chrome hover:text-blood"
            >
              The stand
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fade(reduce)}
          className="relative z-10 flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary md:px-8"
        >
          {STRIP.map((word, index) => (
            <span key={word} className="inline-flex items-center gap-4">
              {index > 0 && <span className="text-blood">/</span>}
              {word}
            </span>
          ))}
        </motion.div>
      </motion.section>

      <section className="border-t border-line bg-base">
        <div className="grid lg:grid-cols-[minmax(16rem,0.7fr)_1.5fr]">
          <Reveal className="flex flex-col border-b border-line px-4 py-8 md:px-8 lg:border-r lg:border-b-0 lg:py-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Limited drop</p>
            <h2 className="mt-2 font-bebas text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.78] tracking-tight">
              DROP
              <span className="text-blood"> 01</span>
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

      <section className="grit border-t border-line">
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
          <Reveal className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">The stand</p>
              <h2 className="mt-1 font-bebas text-5xl leading-[0.85] tracking-tight md:text-7xl">Builds</h2>
            </div>
            <Link
              href="/builds"
              className="font-display text-xs uppercase tracking-[0.2em] text-chrome hover:text-blood"
            >
              All notes
            </Link>
          </Reveal>
          <div className="grid gap-px bg-line md:grid-cols-3">
            {BUILDS.map((build, index) => (
              <Reveal key={build.index} delay={index * 0.05} className="bg-base">
                <Link href="/builds" className="flex h-full flex-col px-4 py-5 transition-colors hover:bg-surface md:px-5">
                  <div className="flex items-center justify-between gap-3 border-b border-dashed border-line pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
                      Job {build.index}
                    </span>
                    <span className="border border-blood px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-blood">
                      {build.stamp}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                    {build.when} · {build.where}
                  </p>
                  <h3 className="mt-2 font-bebas text-4xl leading-none tracking-tight md:text-5xl">{build.title}</h3>
                  <p className="mt-3 border-l-2 border-blood pl-3 text-sm leading-relaxed text-secondary">{build.note}</p>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-chrome">Open the notes</p>
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
              <Reveal key={event.date} delay={index * 0.05} className={index === 1 ? "md:ml-12" : ""}>
                <article className="grid items-end gap-4 border-t border-line py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                  <p className="font-bebas text-6xl leading-none text-blood">{event.date}</p>
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
  const limited = piece.badge === "Limited";
  return (
    <Link href={piece.href} className="group relative block min-h-[320px] bg-base sm:min-h-[420px]">
      <div className="absolute inset-0">
        {piece.image ? (
          <Image
            src={piece.image}
            alt={piece.title}
            fill
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="object-cover contrast-125 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <FlashPlate />
        )}
      </div>
      <span
        className={`absolute left-3 top-3 z-10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
          limited ? "bg-gold text-base" : "bg-blood text-primary"
        }`}
      >
        {piece.badge}
      </span>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-base via-base/75 to-transparent px-4 pb-4 pt-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-chrome">{piece.detail}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="font-bebas text-3xl leading-[0.85] tracking-tight group-hover:text-blood md:text-4xl">
            {piece.title}
          </h3>
          <p className="shrink-0 font-display text-sm">{piece.price}</p>
        </div>
      </div>
    </Link>
  );
}

function CropMarks() {
  const arm = "absolute z-10 h-4 w-4 border-chrome";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3 md:inset-5">
      <span className={`${arm} left-0 top-0 border-l border-t`} />
      <span className={`${arm} right-0 top-0 border-r border-t`} />
      <span className={`${arm} bottom-10 left-0 border-b border-l`} />
      <span className={`${arm} bottom-10 right-0 border-r border-b`} />
    </div>
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
