"use client";

import { useCart } from "./CartProvider";

export function AddToCartButton({
  productId,
  slug,
  title,
  priceCents,
  imageUrl,
  disabled,
  label = "Add to cart",
}: {
  productId: string;
  slug: string;
  title: string;
  priceCents: number;
  imageUrl?: string | null;
  disabled?: boolean;
  label?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => addItem({ productId, slug, title, priceCents, imageUrl })}
      className="w-full bg-white py-4 font-mono text-xs uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-chrome disabled:cursor-not-allowed disabled:border disabled:border-white/20 disabled:bg-transparent disabled:text-brand-steel"
    >
      {label}
    </button>
  );
}
