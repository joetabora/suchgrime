"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CartButton } from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/features", label: "Features" },
  { href: "/builds", label: "Garage" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:px-8">
          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`label text-sm transition-colors hover:text-blood ${
                    link.href === "/shop" ? "text-blood" : ""
                  } ${active ? "underline decoration-2 underline-offset-8" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            className="justify-self-start md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Logo onClick={() => setOpen(false)} />

          <div className="flex items-center justify-end gap-6">
            <Link
              href="/submit"
              className="label hidden text-sm hover:text-blood md:inline"
            >
              Submit a bike
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would trap a fixed overlay inside the bar. */}
      {open && (
        <nav
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-paper px-6 pb-8 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex items-center justify-between py-4">
            <Logo onClick={() => setOpen(false)} />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          {[...NAV_LINKS, { href: "/submit", label: "Submit a bike" }].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-goth text-4xl hover:text-blood"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </>
  );
}
