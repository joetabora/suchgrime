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
    <Link href={`/shop/${product.slug}`} className="group relative flex flex-col bg-base">
      <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
        {primary ? (
          <>
            <Image
              src={primary}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover contrast-125 transition-transform duration-500 group-hover:scale-[1.03] ${
                secondary ? "group-hover:opacity-0" : ""
              }`}
            />
            {secondary && (
              <Image
                src={secondary}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-0 contrast-125 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-surface">
            <span className="font-bebas text-5xl tracking-wide text-line">SG</span>
          </div>
        )}
        <span aria-hidden className="absolute left-0 top-0 h-full w-0.5 bg-blood" />
        {badge && (
          <span
            className={`absolute left-3 top-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
              badge === "Limited"
                ? "bg-gold text-base"
                : badge === "Sale"
                  ? "bg-blood text-primary"
                  : "bg-chrome text-base"
            }`}
          >
            {badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base via-base/80 to-transparent px-3 pb-3 pt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-chrome">{product.category}</p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <h3 className="font-bebas text-[1.7rem] leading-[0.85] tracking-tight group-hover:text-blood md:text-3xl">
              {product.title}
            </h3>
            <p className="shrink-0 text-right font-display text-sm leading-none">
              <span className={onSale ? "text-blood" : "text-primary"}>{formatMoney(product.priceCents)}</span>
              {onSale && (
                <span className="mt-1 block text-[11px] text-secondary line-through">
                  {formatMoney(product.compareAtCents!)}
                </span>
              )}
            </p>
          </div>
          {low && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-blood">
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
    <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
