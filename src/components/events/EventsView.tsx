"use client";

import { useState } from "react";

const FILTERS = ["All", "Rides", "Shows", "Garage Nights"] as const;
type Filter = (typeof FILTERS)[number];
type Kind = Exclude<Filter, "All">;

type Ride = {
  id: string;
  month: string;
  day: string;
  weekday: string;
  title: string;
  place: string;
  kind: Kind;
  line: string;
};

const RIDES: Ride[] = [
  {
    id: "winter-swap",
    month: "Nov",
    day: "12",
    weekday: "Thu",
    title: "Winter Swap Meet",
    place: "State Fair Park",
    kind: "Shows",
    line: "Get there early. The good boxes are gone by noon.",
  },
  {
    id: "lakeshore",
    month: "Nov",
    day: "14",
    weekday: "Sat",
    title: "Lakeshore Run",
    place: "Milwaukee lakefront",
    kind: "Rides",
    line: "Short loop down the lake if the roads are clear. We leave when the coffee's gone.",
  },
  {
    id: "bench-night",
    month: "Nov",
    day: "20",
    weekday: "Fri",
    title: "Bench Night",
    place: "Walker's Point",
    kind: "Garage Nights",
    line: "Forks are on the floor. Come turn a wrench or just hang.",
  },
  {
    id: "bay-view",
    month: "Nov",
    day: "28",
    weekday: "Sat",
    title: "Bay View Roll",
    place: "Bay View",
    kind: "Rides",
    line: "Meet behind the shop and take the long way home.",
  },
  {
    id: "flash-parts",
    month: "Dec",
    day: "06",
    weekday: "Sun",
    title: "Flash & Parts",
    place: "South Side",
    kind: "Shows",
    line: "A few tables, a few bikes, nobody's in a hurry.",
  },
  {
    id: "friday-open",
    month: "Dec",
    day: "11",
    weekday: "Fri",
    title: "Friday Night Open",
    place: "Riverwest",
    kind: "Garage Nights",
    line: "Garage door's up. Bring whatever's been sitting in the corner.",
  },
];

export function EventsView() {
  const [filter, setFilter] = useState<Filter>("All");
  const [rolling, setRolling] = useState<string[]>([]);
  const visible = filter === "All" ? RIDES : RIDES.filter((ride) => ride.kind === filter);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-12 md:px-8 md:pt-16">
      <header className="max-w-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Come through</p>
        <h1 className="mt-2 font-bebas text-6xl leading-[0.85] tracking-tight md:text-8xl">Events</h1>
        <p className="mt-4 text-base leading-relaxed text-secondary md:text-lg">
          Local rides and garage nights. If it&apos;s happening around Milwaukee, it&apos;s on here.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="tablist" aria-label="Event types">
          {FILTERS.map((name) => {
            const active = filter === name;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(name)}
                className={`border-b pb-1 font-display text-xs uppercase tracking-[0.16em] transition-colors ${
                  active ? "border-gold text-gold" : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
          {visible.length} coming up
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {visible.map((ride) => (
            <EventCard
              key={ride.id}
              ride={ride}
              rolling={rolling.includes(ride.id)}
              onToggle={() =>
                setRolling((current) =>
                  current.includes(ride.id) ? current.filter((id) => id !== ride.id) : [...current, ride.id]
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 max-w-xl bg-surface px-6 py-12 md:px-8">
          <p className="font-bebas text-5xl leading-[0.9] tracking-tight md:text-6xl">Nothing posted yet.</p>
          <p className="mt-3 text-secondary">Garage is open.</p>
        </div>
      )}
    </div>
  );
}

function EventCard({
  ride,
  rolling,
  onToggle,
}: {
  ride: Ride;
  rolling: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="flex flex-col gap-5 border border-line bg-surface px-5 py-5 md:flex-row md:items-center md:gap-8 md:px-6 md:py-6">
      <div className="shrink-0 md:w-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
          {ride.month} · {ride.weekday}
        </p>
        <p className="font-bebas text-6xl leading-none tracking-tight md:text-7xl">{ride.day}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">{ride.kind}</p>
        <h2 className="mt-1 font-bebas text-4xl leading-none tracking-tight md:text-5xl">{ride.title}</h2>
        <p className="mt-2 text-sm text-primary">{ride.place}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-secondary">{ride.line}</p>
      </div>
      <button
        type="button"
        aria-pressed={rolling}
        onClick={onToggle}
        className={`shrink-0 self-start border px-4 py-2 font-display text-[0.72rem] uppercase tracking-[0.16em] transition-colors md:self-center ${
          rolling
            ? "border-gold bg-gold text-[var(--color-base)]"
            : "border-line text-chrome hover:border-gold hover:text-gold"
        }`}
      >
        I&apos;m Rolling
      </button>
    </article>
  );
}
