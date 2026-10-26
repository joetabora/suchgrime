"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";

export default function ShopSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <span className="ribbon">Paid in full</span>
      <h1 className="mt-4 font-goth text-6xl md:text-8xl">Order received</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
        Thanks for supporting SuchGrime. Stripe will email you a receipt.
      </p>
      <Link href="/shop" className="btn-ink mt-10">
        Keep shopping
      </Link>
    </div>
  );
}
