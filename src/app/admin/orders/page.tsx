import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="mb-2 font-bebas text-5xl tracking-tight text-white">Orders</h1>
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-brand-steel">
        Stripe checkout history
      </p>

      <div className="divide-y divide-white/10 border border-white/10">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-oswald text-lg uppercase text-white">{order.email}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                  {order.createdAt.toLocaleString()} · {order.status} · {formatMoney(order.totalCents)}
                </p>
              </div>
              <p className="font-mono text-[10px] text-brand-steel">{order.stripeSessionId}</p>
            </div>
            <ul className="mt-3 space-y-1">
              {order.items.map((item) => (
                <li key={item.id} className="font-inter text-sm text-brand-chrome">
                  {item.quantity}× {item.title} — {formatMoney(item.priceCents * item.quantity)}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="p-8 font-inter text-sm text-brand-steel">
            No orders yet. Complete a Stripe test checkout to see them here.
          </p>
        )}
      </div>
    </div>
  );
}
