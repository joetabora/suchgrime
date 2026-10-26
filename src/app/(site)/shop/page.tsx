import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { categorySlug } from "@/lib/products";
import { ProductGrid } from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop",
  description: "SuchGrime apparel, accessories, and custom parts.",
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
    <div className="mx-auto max-w-screen-2xl px-4 pb-24 pt-10 md:px-8">
      <header className="mb-10 text-center">
        <span className="ribbon">The Goods</span>
        <h1 className="mt-4 font-goth text-6xl md:text-8xl">{activeName ?? "Shop All"}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Chopper iron, tattoo flash, and graveyard dread — printed, stitched, and machined in small runs.
        </p>
        {cancelled && (
          <p className="mt-4 text-sm text-blood">Checkout cancelled. Your cart is still saved.</p>
        )}
      </header>

      {categories.length > 1 && (
        <nav className="no-scrollbar mb-10 flex justify-start gap-2 overflow-x-auto md:justify-center" aria-label="Categories">
          <CategoryTab href="/shop" active={!category}>
            All
          </CategoryTab>
          {categories.map((c) => (
            <CategoryTab key={c} href={`/shop?category=${categorySlug(c)}`} active={category === categorySlug(c)}>
              {c}
            </CategoryTab>
          ))}
        </nav>
      )}

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="font-goth text-4xl">Nothing here yet</p>
          <p className="mt-2 text-ink-soft">The first drop is being inked. Sign up below to hear when it lands.</p>
        </div>
      )}
    </div>
  );
}

function CategoryTab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`label shrink-0 rounded-full border px-5 py-2 transition-colors ${
        active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
      }`}
    >
      {children}
    </Link>
  );
}
