import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { isStripeConfigured } from "@/lib/stripe";
import { categorySlug, isPurchasable, parseSizes, productImages, statusLabel } from "@/lib/products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductGrid } from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  return prisma.product.findFirst({ where: { slug, active: true } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: product.imageUrl ? { images: [product.imageUrl] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { active: true, category: product.category, id: { not: product.id } },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const stripeReady = isStripeConfigured();
  const status = statusLabel(product);
  const canBuy = isPurchasable(product) && stripeReady;
  const onSale = !status && product.compareAtCents != null && product.compareAtCents > product.priceCents;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-24 pt-8 md:px-8">
      <nav className="label mb-6 text-[0.65rem] text-ink-soft" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>{" "}
        /{" "}
        <Link href={`/shop?category=${categorySlug(product.category)}`} className="hover:text-ink">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <ProductGallery images={productImages(product)} title={product.title} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          {(status || onSale) && <span className="ribbon mb-4">{status ?? "Sale"}</span>}
          <h1 className="font-goth text-5xl leading-none md:text-6xl">{product.title}</h1>
          <p className="mt-4 text-2xl">
            <span className={onSale ? "text-blood" : ""}>{formatMoney(product.priceCents)}</span>
            {onSale && (
              <span className="ml-3 text-lg text-ink-soft line-through">{formatMoney(product.compareAtCents!)}</span>
            )}
          </p>

          <div className="my-8 border-t border-line" />

          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            title={product.title}
            priceCents={product.priceCents}
            imageUrl={product.imageUrl}
            sizes={parseSizes(product.sizes)}
            disabled={!canBuy}
            disabledLabel={status ?? (!stripeReady ? "Checkout opening soon" : "Unavailable")}
          />
          {canBuy && product.inventory <= 5 && (
            <p className="mt-3 text-sm text-blood">Only {product.inventory} left</p>
          )}

          <div className="mt-10 whitespace-pre-line leading-relaxed text-ink-soft">{product.description}</div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-goth text-4xl">More {product.category}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
