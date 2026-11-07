"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const BUILDS = [
  {
    index: "01",
    stage: "Mock-up",
    title: "Rigid Panhead",
    text: "Forks kicked out. Paint still wet. South Side stand.",
    accent: "blood" as const,
  },
  {
    index: "02",
    stage: "Teardown",
    title: "Shovelhead",
    text: "Cases split on the bench. Bay View.",
    accent: "chrome" as const,
  },
  {
    index: "03",
    stage: "Fabrication",
    title: "Ironhead",
    text: "New neck. Old sins. Walker's Point.",
    accent: "gold" as const,
  },
];

const EVENTS = [
  { date: "06.13", title: "Lakeshore Run", place: "Milwaukee lakefront" },
  { date: "08.07", title: "Garage Night", place: "Walker's Point" },
];

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

export function HomeView() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-hidden">
      <motion.section
        className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-between px-4 pb-8 pt-8 md:px-8 md:pb-10 md:pt-12"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
        }}
      >
        <motion.div
          variants={fade(reduce)}
          className="flex items-start justify-between gap-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
            Milwaukee · Wis
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-secondary sm:block">
            Chopper / Flash / Iron
          </p>
        </motion.div>

        <div className="relative">
          <motion.p
            variants={fade(reduce)}
            className="pointer-events-none absolute -top-6 right-[8%] hidden font-goth text-6xl text-blood lg:block"
          >
            Such
          </motion.p>
          <motion.h1
            variants={fade(reduce)}
            className="font-bebas text-[clamp(4.6rem,15vw,9.75rem)] leading-[0.8] tracking-tight"
          >
            RIDE UGLY.
            <span className="mt-1 block text-blood md:pl-[16vw]">DIE PRETTY.</span>
          </motion.h1>
        </div>

        <motion.div
          variants={fade(reduce)}
          className="mt-10 grid items-end gap-8 border-t border-line pt-6 md:grid-cols-[1fr_auto]"
        >
          <p className="max-w-md text-base leading-relaxed text-secondary md:text-lg">
            Long forks, short fuse, and flash sheets drawn for the people who stay in the garage until it runs.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/shop" className="btn-blood">
              Shop the drop
            </Link>
            <Link
              href="/builds"
              className="font-display text-xs uppercase tracking-[0.2em] text-chrome hover:text-blood"
            >
              See the builds
            </Link>
          </div>
        </motion.div>

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-28 right-0 hidden h-28 w-px bg-gold lg:block"
        />
      </motion.section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">The garage</p>
            <h2 className="mt-3 font-bebas text-7xl leading-[0.82] tracking-tight md:text-8xl">
              Featured
              <span className="block">Builds</span>
            </h2>
            <Link
              href="/builds"
              className="mt-8 inline-block font-display text-xs uppercase tracking-[0.2em] text-chrome hover:text-blood"
            >
              All builds
            </Link>
          </Reveal>

          <div className="grid gap-4 lg:col-span-8 lg:grid-cols-2">
            {BUILDS.map((build, i) => (
              <Reveal key={build.index} delay={i * 0.06} className={i === 0 ? "lg:col-span-2" : ""}>
                <Link
                  href="/builds"
                  className="group flex min-h-[280px] flex-col justify-between border border-line bg-surface p-5 transition-colors hover:border-chrome md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                      {build.stage}
                    </span>
                    <span className="font-bebas text-5xl leading-none text-chrome/25">{build.index}</span>
                  </div>
                  <ForkMark accent={build.accent} large={i === 0} />
                  <div>
                    <h3 className="font-bebas text-5xl leading-none tracking-tight md:text-6xl">
                      {build.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">{build.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">On the road</p>
            <h2 className="mt-3 font-bebas text-7xl leading-[0.82] md:text-8xl">Upcoming</h2>
          </Reveal>
          <div className="lg:col-span-8 lg:pt-10">
            {EVENTS.map((event, i) => (
              <Reveal key={event.date} delay={i * 0.05} className={i === 1 ? "md:ml-16" : ""}>
                <article className="grid items-end gap-4 border-t border-line py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                  <p className="font-bebas text-6xl leading-none text-blood md:text-7xl">{event.date}</p>
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

      <section className="border-t border-line">
        <div className="grid lg:grid-cols-12">
          <Reveal className="relative overflow-hidden border-b border-line px-4 py-16 md:px-8 lg:col-span-7 lg:border-r lg:border-b-0 lg:py-24">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Shop</p>
            <h2 className="mt-2 font-bebas text-[clamp(6rem,16vw,13rem)] leading-[0.74] tracking-tight">
              DROP
              <span className="block text-blood">01</span>
            </h2>
            <p className="mt-6 max-w-sm text-secondary">
              First cloth off the sheet. Small run. When it&apos;s gone, it&apos;s gone.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex items-stretch bg-elevated p-4 md:p-8 lg:col-span-5">
            <article className="flex w-full flex-col border border-line bg-base">
              <div className="relative aspect-[4/5] border-b border-line">
                <FlashPlate />
                <span className="absolute left-4 top-4 bg-gold px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-base">
                  Limited
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <h3 className="font-bebas text-4xl leading-none">Flash Tee</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
                    Black / chest hit
                  </p>
                </div>
                <p className="font-display text-lg tracking-wide">$48</p>
              </div>
            </article>
          </Reveal>
        </div>
        <div className="flex justify-end border-t border-line px-4 py-5 md:px-8">
          <Link href="/shop" className="btn-blood">
            Shop the drop
          </Link>
        </div>
      </section>
    </div>
  );
}

function fade(reduce: boolean | null) {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
}

function ForkMark({
  accent,
  large,
}: {
  accent: "blood" | "chrome" | "gold";
  large?: boolean;
}) {
  const stroke = accent === "blood" ? "#C41E3A" : accent === "gold" ? "#D4AF37" : "#E8E8E8";
  return (
    <svg
      viewBox="0 0 160 48"
      className={large ? "my-8 h-12 w-40" : "my-6 h-8 w-28"}
      aria-hidden
    >
      <circle cx="24" cy="24" r="14" fill="none" stroke={stroke} strokeWidth="3" />
      <circle cx="24" cy="24" r="3" fill="#E8E8E8" />
      <rect x="42" y="21" width="118" height="6" fill="#E8E8E8" />
    </svg>
  );
}

function FlashPlate() {
  return (
    <svg viewBox="0 0 240 320" className="h-full w-full" aria-hidden>
      <rect width="240" height="320" fill="#0A0A0A" />
      <path d="M28 58 H212 L196 92 H44 Z" fill="#C41E3A" />
      <path d="M108 104 L120 268 L132 104 Z" fill="#E8E8E8" />
      <rect x="62" y="96" width="116" height="14" fill="#D4AF37" />
      <rect x="104" y="110" width="32" height="28" fill="#D4AF37" />
    </svg>
  );
}
