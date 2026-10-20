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
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="mb-4 font-bebas text-6xl uppercase tracking-tight text-white md:text-8xl">
        Order received
      </h1>
      <p className="mb-10 font-playfair text-xl italic text-brand-chrome">
        Thanks for supporting SuchGrime. You&apos;ll get a Stripe receipt by email.
      </p>
      <Link
        href="/shop"
        className="inline-block bg-white px-8 py-4 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-chrome"
      >
        Back to Supply
      </Link>
    </div>
  );
}
