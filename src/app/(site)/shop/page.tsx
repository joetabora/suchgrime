import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { categorySlug } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop",
  description: "SuchGrime apparel, accessories, and custom parts. Small runs.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; cancelled?: string }>;
}) {
  const { category, cancelled } = await searchParams;
  const products = await safeQuery(
    () =>
      prisma.product.findMany({
        where: { active: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      }),
    []
  );

  const categories = [...new Set(products.map((p) => p.category))].sort();
  const visible = category ? products.filter((p) => categorySlug(p.category) === category) : products;
  const activeName = categories.find((c) => categorySlug(c) === category);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-8 md:px-8">
      <header className="mb-6 flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">The sheet</p>
          <h1 className="mt-2 font-bebas text-6xl leading-[0.8] tracking-tight md:text-8xl">
            {activeName ?? "Shop"}
          </h1>
          {cancelled && (
            <p className="mt-4 text-sm text-blood">Checkout cancelled. Your cart is still saved.</p>
          )}
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-secondary md:text-right">
          Small runs, made to actually get worn. If it&apos;s on the sheet, it&apos;s in the shop.
        </p>
      </header>

      {categories.length > 1 && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav className="no-scrollbar flex gap-2 overflow-x-auto" aria-label="Categories">
            <CategoryTab href="/shop" active={!category}>
              All
            </CategoryTab>
            {categories.map((name) => (
              <CategoryTab
                key={name}
                href={`/shop?category=${categorySlug(name)}`}
                active={category === categorySlug(name)}
              >
                {name}
              </CategoryTab>
            ))}
          </nav>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">
            {visible.length} on the sheet
          </p>
        </div>
      )}

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <EmptySheet filtered={Boolean(category)} name={activeName ?? category} />
      )}
    </div>
  );
}

function CategoryTab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 border px-3 py-2 font-display text-[0.72rem] uppercase tracking-[0.16em] transition-colors ${
        active ? "border-gold bg-gold text-[var(--color-base)]" : "border-line text-secondary hover:border-gold hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}

function EmptySheet({ filtered, name }: { filtered: boolean; name?: string }) {
  return (
    <div className="max-w-xl bg-surface px-6 py-12 md:px-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Drop 01</p>
      <h2 className="mt-3 font-bebas text-5xl leading-[0.85] tracking-tight md:text-7xl">
        {filtered ? "Not this run" : "Nothing on the sheet yet"}
      </h2>
      <p className="mt-4 max-w-md text-secondary">
        {filtered
          ? `${name ?? "That"} isn't in this drop. The rest of the shop is still up.`
          : "First pieces are still on the bench. They'll show up here when they're ready to leave the garage."}
      </p>
      {filtered && (
        <Link href="/shop" className="btn-outline mt-8">
          Back to the shop
        </Link>
      )}
    </div>
  );
}
