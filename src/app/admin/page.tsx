import Link from "next/link";
import { prisma } from "@/lib/db";
import { isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [features, builds, events, products, orders, paidOrders, subscribers] = await Promise.all([
    prisma.feature.count(),
    prisma.build.count(),
    prisma.event.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "paid" } }),
    prisma.subscriber.count(),
  ]);

  const cards = [
    { label: "Features", count: features, href: "/admin/features" },
    { label: "Builds", count: builds, href: "/admin/builds" },
    { label: "Events", count: events, href: "/admin/events" },
    { label: "Products", count: products, href: "/admin/products" },
    { label: "Orders", count: orders, href: "/admin/orders" },
    { label: "Paid orders", count: paidOrders, href: "/admin/orders" },
    { label: "Mailing list", count: subscribers, href: "/admin/subscribers" },
  ];

  return (
    <div>
      <h1 className="mb-2 font-bebas text-5xl tracking-tight text-white">Dashboard</h1>
      <p className="mb-10 font-mono text-xs uppercase tracking-widest text-brand-steel">
        Stripe: {isStripeConfigured() ? "Configured" : "Not configured — add STRIPE_SECRET_KEY"}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-white/10 bg-brand-graphite p-6 transition-colors hover:border-brand-rust"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">{card.label}</p>
            <p className="mt-2 font-bebas text-5xl text-white">{card.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
