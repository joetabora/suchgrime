import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { EmptyState, PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await safeQuery(
    () => prisma.event.findMany({ where: { published: true }, orderBy: { eventDate: "desc" } }),
    []
  );

  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-10 md:px-8">
      <PageHeader
        kicker="Out & about"
        title="Events"
        text="Rides, shows, swap meets, and late-night garage hangouts in and around Milwaukee."
      />

      {events.length > 0 ? (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <article
              key={event.id}
              id={event.slug}
              className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 md:flex-row md:items-center md:gap-10"
            >
              <div className="w-24 shrink-0 text-center">
                <p className="label text-blood">{event.eventDate.toLocaleDateString("en-US", { month: "short" })}</p>
                <p className="font-goth text-6xl leading-none">
                  {event.eventDate.toLocaleDateString("en-US", { day: "2-digit" })}
                </p>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl uppercase">{event.title}</h2>
                <p className="label mt-1 text-[0.65rem] text-ink-soft">{event.location}</p>
                {event.description && <p className="mt-2 max-w-2xl text-ink-soft">{event.description}</p>}
              </div>
              <span className="label self-start rounded-full border border-ink px-4 py-1.5 text-[0.65rem] md:self-center">
                {event.status}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="Nothing on the calendar" text="Check back soon for rides and shows." />
      )}
    </div>
  );
}
