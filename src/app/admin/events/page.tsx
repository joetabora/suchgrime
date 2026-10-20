import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteEvent } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { eventDate: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-bebas text-5xl tracking-tight text-white">Events</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-steel">
            {events.length} events
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-chrome"
        >
          Add event
        </Link>
      </div>

      <div className="divide-y divide-white/10 border border-white/10">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-oswald text-xl uppercase text-white">{event.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                {event.eventDate.toLocaleDateString()} · {event.location} · {event.status}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/events/${event.id}`}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-chrome hover:text-white"
              >
                Edit
              </Link>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={event.id} />
                <button type="submit" className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="p-8 font-inter text-sm text-brand-steel">No events yet.</p>}
      </div>
    </div>
  );
}
