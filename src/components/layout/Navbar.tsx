"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CartButton } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/shop", label: "Shop" },
  { href: "/builds", label: "Builds" },
  { href: "/features", label: "Features" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-3 md:px-8">
          <Link
            href="/"
            className="font-bebas text-[1.85rem] leading-none tracking-[0.04em] text-primary transition-colors hover:text-gold"
          >
            SUCHGRIME
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-display text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    active ? "text-gold" : "text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <CartButton />
            <button
              type="button"
              className="text-primary lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav
          className="fixed inset-0 z-[55] flex flex-col bg-base px-6 pb-10 pt-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-bebas text-3xl tracking-[0.04em]"
            >
              SUCHGRIME
            </Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="mt-10 flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-4"
              >
                <span className="font-bebas text-5xl leading-none tracking-tight">
                  {link.label}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-secondary">
                  0{index + 1}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">
            Milwaukee, Wisconsin
          </p>
        </nav>
      )}
    </>
  );
}
