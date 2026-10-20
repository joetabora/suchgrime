import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events | SUCHGRIME",
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { eventDate: "desc" },
  });

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
      <header className="mb-20">
        <h1 className="mb-4 font-bebas text-7xl uppercase tracking-tight text-white md:text-9xl">
          Events
        </h1>
        <p className="max-w-2xl font-playfair text-xl italic text-brand-steel md:text-2xl">
          Rides, shows, swap meets, and late-night garage hangouts in and around Milwaukee.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {events.map((event) => (
          <article
            key={event.id}
            className="group flex flex-col justify-between gap-4 border-b border-white/10 pb-8 transition-colors hover:border-brand-rust md:flex-row md:items-center"
          >
            <div className="flex items-center gap-8 md:gap-16">
              <div className="w-24 font-bebas text-4xl text-brand-steel transition-colors group-hover:text-white md:text-5xl">
                {event.eventDate.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
              </div>
              <div>
                <h3 className="font-oswald text-3xl uppercase text-white transition-colors group-hover:text-brand-chrome">
                  {event.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-rust">
                  {event.location}
                </span>
                {event.description && (
                  <p className="mt-2 max-w-xl font-inter text-sm text-brand-chrome">{event.description}</p>
                )}
              </div>
            </div>
            <div className="self-start border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors group-hover:border-brand-rust group-hover:text-brand-rust md:self-center">
              {event.status}
            </div>
          </article>
        ))}
      </div>

      {events.length === 0 && (
        <p className="font-inter text-brand-steel">No events published yet.</p>
      )}
    </div>
  );
}
