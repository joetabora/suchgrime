import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events",
  description: "Rides, hangouts, and shop nights around Milwaukee.",
};

export default async function EventsPage() {
  const events = await safeQuery(
    () => prisma.event.findMany({ where: { published: true }, orderBy: { eventDate: "desc" } }),
    []
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-12 md:px-8 md:pt-16">
      <header className="mb-10 max-w-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Come through</p>
        <h1 className="mt-2 font-bebas text-6xl leading-[0.85] tracking-tight md:text-8xl">Events</h1>
        <p className="mt-4 text-base leading-relaxed text-secondary md:text-lg">
          Rides, hangouts, and the occasional late night in the garage. Milwaukee, mostly. Show up if you&apos;re around.
        </p>
      </header>

      {events.length > 0 ? (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <article
              key={event.id}
              id={event.slug}
              className="flex flex-col gap-4 bg-surface px-5 py-6 sm:flex-row sm:items-center sm:gap-8 md:px-7"
            >
              <div className="shrink-0 sm:w-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {event.eventDate.toLocaleDateString("en-US", { month: "short" })}
                </p>
                <p className="font-bebas text-6xl leading-none tracking-tight text-primary">
                  {event.eventDate.toLocaleDateString("en-US", { day: "2-digit" })}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-bebas text-4xl leading-none tracking-tight">{event.title}</h2>
                <p className="mt-2 text-sm text-secondary">{event.location}</p>
                {event.description && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">{event.description}</p>
                )}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold sm:text-right">
                {event.status}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="max-w-xl bg-surface px-6 py-12 md:px-8">
          <p className="font-bebas text-5xl leading-none tracking-tight md:text-6xl">Nothing on the calendar</p>
          <p className="mt-4 max-w-md text-secondary">
            No rides posted yet. When something&apos;s happening, it&apos;ll land here. Until then, the garage is open.
          </p>
        </div>
      )}
    </div>
  );
}
