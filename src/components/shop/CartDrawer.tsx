"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/money";

export function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative text-brand-steel transition-colors hover:text-white"
        aria-label="Open cart"
      >
        <ShoppingBag size={18} />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-brand-rust px-1 font-mono text-[9px] text-white">
            {count}
          </span>
        )}
      </button>
      {open && <CartPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function CartPanel({ onClose }: { onClose: () => void }) {
  const { items, removeItem, setQuantity, subtotalCents, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button type="button" className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Close cart" />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-brand-black">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-oswald text-2xl uppercase text-white">Cart</h2>
          <button type="button" onClick={onClose} className="text-brand-steel hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="font-inter text-sm text-brand-steel">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.productId} className="border-b border-white/5 pb-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-oswald text-lg uppercase text-white">{item.title}</p>
                      <p className="font-mono text-xs text-brand-steel">{formatMoney(item.priceCents)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="font-mono text-[10px] uppercase tracking-widest text-brand-rust"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                      Qty
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, Number(e.target.value) || 1)}
                      className="w-16 border border-white/10 bg-brand-graphite px-2 py-1 text-white"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          <div className="mb-4 flex justify-between font-mono text-xs uppercase tracking-widest">
            <span className="text-brand-steel">Subtotal</span>
            <span className="text-white">{formatMoney(subtotalCents)}</span>
          </div>
          {error && <p className="mb-3 font-inter text-sm text-brand-rust">{error}</p>}
          <button
            type="button"
            disabled={items.length === 0 || loading}
            onClick={checkout}
            className="mb-3 w-full bg-brand-rust py-4 font-oswald text-xl uppercase tracking-wider text-white disabled:opacity-40"
          >
            {loading ? "Redirecting…" : "Checkout with Stripe"}
          </button>
          <div className="flex justify-between">
            <Link href="/shop" onClick={onClose} className="font-mono text-[10px] uppercase tracking-widest text-brand-steel hover:text-white">
              Continue shopping
            </Link>
            {items.length > 0 && (
              <button type="button" onClick={clear} className="font-mono text-[10px] uppercase tracking-widest text-brand-steel hover:text-white">
                Clear
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
