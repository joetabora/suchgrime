import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";
import { formatMoney } from "@/lib/money";
import { productImages, statusLabel } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [primary, secondary] = productImages(product);
  const status = statusLabel(product);
  const onSale = !status && product.compareAtCents != null && product.compareAtCents > product.priceCents;

  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-card">
        {primary ? (
          <>
            <Image
              src={primary}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${
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
          <div className="flex h-full items-center justify-center font-goth text-3xl text-line">SuchGrime</div>
        )}
        {(status || onSale) && (
          <span className={`ribbon absolute left-3 top-3 ${status ? "!bg-ink" : ""}`}>{status ?? "Sale"}</span>
        )}
      </div>
      <p className="label text-[0.65rem] text-ink-soft">{product.category}</p>
      <h3 className="mt-1 font-display text-lg uppercase leading-tight group-hover:text-blood">{product.title}</h3>
      <p className="mt-1 text-sm">
        <span className={onSale ? "text-blood" : ""}>{formatMoney(product.priceCents)}</span>
        {onSale && (
          <span className="ml-2 text-ink-soft line-through">{formatMoney(product.compareAtCents!)}</span>
        )}
      </p>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
