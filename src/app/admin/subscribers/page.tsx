import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-2 font-bebas text-5xl tracking-tight text-white">Mailing List</h1>
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-brand-steel">
        {subscribers.length} subscribers · from the newsletter signup forms
      </p>
      <div className="divide-y divide-white/10 border border-white/10 bg-brand-graphite">
        {subscribers.map((s) => (
          <div key={s.id} className="flex justify-between gap-4 p-4 font-inter text-sm">
            <span className="text-white">{s.email}</span>
            <span className="text-brand-steel">{s.createdAt.toLocaleDateString("en-US")}</span>
          </div>
        ))}
        {subscribers.length === 0 && <p className="p-4 text-sm text-brand-steel">No subscribers yet.</p>}
      </div>
    </div>
  );
}
