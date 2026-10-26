"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/money";

export function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      className="relative text-ink transition-colors hover:text-blood"
      aria-label={`Open cart (${count} items)`}
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blood px-1 font-mono text-[9px] text-paper">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, isOpen, close, removeItem, setQuantity, subtotalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, size: i.size, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Cart">
      <button type="button" className="absolute inset-0 bg-ink/50" onClick={close} aria-label="Close cart" />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-goth text-3xl">Your Cart</h2>
          <button type="button" onClick={close} className="hover:text-blood" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-6 text-ink-soft">Nothing in here yet.</p>
              <Link href="/shop" onClick={close} className="btn-ink">
                Shop the goods
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-card">
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt={item.title} fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={close}
                        className="font-display text-base uppercase leading-tight hover:text-blood"
                      >
                        {item.title}
                      </Link>
                      <span className="text-sm">{formatMoney(item.priceCents * item.quantity)}</span>
                    </div>
                    {item.size && <p className="label mt-1 text-ink-soft">Size {item.size}</p>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          className="px-3 py-1"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label={`Decrease ${item.title} quantity`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="px-3 py-1"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label={`Increase ${item.title} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="label text-ink-soft underline hover:text-blood"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="mb-1 flex justify-between font-display text-lg uppercase">
              <span>Subtotal</span>
              <span>{formatMoney(subtotalCents)}</span>
            </div>
            <p className="mb-4 text-xs text-ink-soft">Shipping and taxes calculated at checkout.</p>
            {error && <p className="mb-3 text-sm text-blood">{error}</p>}
            <button
              type="button"
              disabled={loading}
              onClick={checkout}
              className="btn-blood w-full disabled:opacity-50"
            >
              {loading ? "Redirecting…" : "Checkout"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
