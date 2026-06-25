import Link from "next/link"
import { desc, gte, lt } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { strategyCallBookings } from "@/lib/db/schema"
import { formatChicagoDateTime } from "@/lib/scheduler/timezone"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Bookings",
}

export default async function AdminBookingsPage() {
  const db = getDb()

  let bookings: (typeof strategyCallBookings.$inferSelect)[] = []
  let pastBookings: (typeof strategyCallBookings.$inferSelect)[] = []
  let dbError: string | null = null

  if (db) {
    try {
      bookings = await db
        .select()
        .from(strategyCallBookings)
        .where(gte(strategyCallBookings.slotStart, new Date()))
        .orderBy(strategyCallBookings.slotStart)

      pastBookings = await db
        .select()
        .from(strategyCallBookings)
        .where(lt(strategyCallBookings.slotStart, new Date()))
        .orderBy(desc(strategyCallBookings.slotStart))
        .limit(20)
    } catch {
      dbError = "Bookings table not found. Run npm run db:migrate to create it."
    }
  }

  return (
    <div className="parlor-desk min-h-screen bg-bg text-text">
      <header className="border-b border-white/10 bg-bg/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Strategy Call Bookings</h1>
            <p className="text-xs text-muted">Upcoming scheduled calls</p>
          </div>
          <Link
            href="/admin/locations"
            className="text-sm text-desk-accent hover:underline"
          >
            ← CMS Admin
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        {!db && (
          <div className="glass glass-border rounded-lg border border-dashed p-8 text-center text-muted">
            DATABASE_URL not configured. Bookings require a database connection.
          </div>
        )}

        {dbError && (
          <div className="glass glass-border rounded-lg border border-dashed p-8 text-center text-parlor-accent">
            {dbError}
          </div>
        )}

        {db && !dbError && bookings.length === 0 && (
          <div className="glass glass-border rounded-lg border border-dashed p-8 text-center text-muted">
            No upcoming bookings yet.
          </div>
        )}

        {bookings.length > 0 && (
          <div className="glass glass-border overflow-hidden rounded-lg border backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-left">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">When</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Client</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Project</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-text">{formatChicagoDateTime(b.slotStart)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-text">{b.name}</p>
                      <p className="text-xs text-muted">{b.email}</p>
                      {b.company && <p className="text-xs text-muted">{b.company}</p>}
                    </td>
                    <td className="px-4 py-3 text-muted">{b.projectType ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full border border-desk-success/30 bg-desk-success/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-desk-success">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pastBookings.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-sm font-semibold text-muted">Recent (last 90 days)</h2>
            <div className="glass glass-border overflow-hidden rounded-lg border backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-left">
                    <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">When</th>
                    <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Client</th>
                    <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBookings.map((b) => (
                    <tr key={`past-${b.id}`} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 text-text">{formatChicagoDateTime(b.slotStart)}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-text">{b.name}</p>
                        <p className="text-xs text-muted">{b.email}</p>
                      </td>
                      <td className="px-4 py-3 text-muted">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
