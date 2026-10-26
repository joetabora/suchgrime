"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export function AddToCartButton({
  productId,
  slug,
  title,
  priceCents,
  imageUrl,
  sizes,
  disabled,
  disabledLabel,
}: {
  productId: string;
  slug: string;
  title: string;
  priceCents: number;
  imageUrl?: string | null;
  sizes: string[];
  disabled?: boolean;
  disabledLabel?: string;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const needsSize = sizes.length > 0 && !size;

  return (
    <div className="space-y-5">
      {sizes.length > 0 && (
        <fieldset>
          <legend className="label mb-3">Size {size && <span className="text-ink-soft">— {size}</span>}</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                disabled={disabled}
                className={`min-w-12 rounded-full border px-4 py-2 font-display text-sm uppercase transition-colors disabled:opacity-40 ${
                  size === s ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="button"
        disabled={disabled || needsSize}
        onClick={() => addItem({ productId, slug, title, priceCents, imageUrl, size: size ?? undefined })}
        className="btn-blood w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? disabledLabel ?? "Unavailable" : needsSize ? "Pick a size" : "Add to cart"}
      </button>
    </div>
  );
}
