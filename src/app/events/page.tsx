import Link from "next/link";

export const metadata = {
  title: "Events | SUCHGRIME",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <header className="mb-20">
        <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">Events</h1>
        <p className="font-playfair italic text-xl md:text-2xl text-brand-steel max-w-2xl">
          Rides, shows, swap meets, and late-night garage hangouts in and around Milwaukee.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {[
          { date: "Oct 24", title: "The Fall Scramble", location: "Menomonee Valley", status: "Upcoming" },
          { date: "Nov 12", title: "Winter Swap Meet", location: "State Fair Park", status: "Upcoming" },
          { date: "Sep 05", title: "Labor Day Run", location: "Lakefront", status: "Past" },
          { date: "Aug 20", title: "Riverwest Chopper Show", location: "Riverwest", status: "Past" }
        ].map((event, idx) => (
          <Link href={`/events/${idx}`} key={idx} className="group border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-rust transition-colors">
            <div className="flex items-center gap-8 md:gap-16">
              <div className="font-bebas text-4xl md:text-5xl text-brand-steel group-hover:text-white transition-colors w-24">
                {event.date}
              </div>
              <div>
                <h3 className="font-oswald text-3xl uppercase text-white group-hover:text-brand-chrome transition-colors">{event.title}</h3>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-rust">{event.location}</span>
              </div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 group-hover:border-brand-rust group-hover:text-brand-rust transition-colors self-start md:self-center">
              {event.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
