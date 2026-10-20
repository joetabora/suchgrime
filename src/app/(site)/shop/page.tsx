import Image from "next/image";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { isStripeConfigured } from "@/lib/stripe";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Supply | SUCHGRIME",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ cancelled?: string }>;
}) {
  const { cancelled } = await searchParams;
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  const stripeReady = isStripeConfigured();

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
      <header className="mb-20 flex flex-col justify-between gap-6 border-b border-brand-steel/20 pb-12 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-brand-rust">
            Hardware & Threads
          </span>
          <h1 className="mb-4 font-bebas text-7xl uppercase tracking-tight text-white md:text-9xl">
            Supply
          </h1>
          <p className="font-inter text-lg text-brand-chrome">
            Original merchandise, print issues, and limited-run custom parts.
          </p>
        </div>
        <div className="text-right font-mono text-[10px] uppercase tracking-widest text-brand-steel">
          <p>{stripeReady ? "Stripe checkout live" : "Checkout pending Stripe keys"}</p>
          {cancelled && <p className="text-brand-rust">Checkout cancelled — cart saved.</p>}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          const canBuy = item.status === "available" && item.inventory > 0 && stripeReady;
          return (
            <div key={item.id} className="group flex flex-col">
              <div className="relative mb-6 aspect-square overflow-hidden border border-white/5 bg-brand-graphite">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-brand-steel">
                    No image
                  </div>
                )}
                <div className="absolute left-4 top-4 border border-brand-rust/30 bg-brand-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  {item.status.replace("_", " ")}
                </div>
              </div>

              <div className="flex flex-grow flex-col">
                <div className="mb-2 flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                    {item.category}
                  </span>
                  <span className="font-mono text-sm text-white">{formatMoney(item.priceCents)}</span>
                </div>
                <h3 className="mb-3 font-oswald text-2xl uppercase text-white">{item.title}</h3>
                <p className="mb-2 flex-grow font-inter text-sm text-brand-chrome/80">{item.description}</p>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                  {item.inventory} in stock
                </p>
                <AddToCartButton
                  productId={item.id}
                  slug={item.slug}
                  title={item.title}
                  priceCents={item.priceCents}
                  imageUrl={item.imageUrl}
                  disabled={!canBuy}
                  label={
                    !stripeReady
                      ? "Checkout not configured"
                      : item.status === "coming_soon"
                        ? "Coming soon"
                        : item.inventory < 1
                          ? "Sold out"
                          : "Add to cart"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="font-inter text-brand-steel">No products listed yet. Add some in /admin.</p>
      )}
    </div>
  );
}
