import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";
import { formatMoney } from "@/lib/money";
import { productImages, statusLabel } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [primary, secondary] = productImages(product);
  const status = statusLabel(product);
  const onSale = !status && product.compareAtCents != null && product.compareAtCents > product.priceCents;
  const low = !status && product.inventory > 0 && product.inventory <= 5;
  const badge = status ? status : product.featured ? "Limited" : onSale ? "Sale" : null;

  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col bg-surface">
      <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
        {primary ? (
          <>
            <Image
              src={primary}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                secondary ? "group-hover:opacity-0" : ""
              }`}
            />
            {secondary && (
              <Image
                src={secondary}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-bebas text-5xl tracking-wide text-line">SG</span>
          </div>
        )}
        {badge && (
          <span className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-base)]">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 bg-primary px-3 py-3 text-[var(--color-base)]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-base)_62%,transparent)]">
            {product.category}
          </p>
          <h3 className="mt-1 font-bebas text-2xl leading-[0.9] tracking-tight md:text-3xl">{product.title}</h3>
        </div>
        <div>
          <p className="font-display text-sm leading-none">
            {formatMoney(product.priceCents)}
            {onSale && (
              <span className="ml-2 text-xs text-[color-mix(in_srgb,var(--color-base)_50%,transparent)] line-through">
                {formatMoney(product.compareAtCents!)}
              </span>
            )}
          </p>
          {low && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-base)_70%,transparent)]">
              {product.inventory} left
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
