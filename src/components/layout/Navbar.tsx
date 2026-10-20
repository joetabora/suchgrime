"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/builds", label: "Builds" },
  { href: "/people", label: "People" },
  { href: "/events", label: "Events" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md py-3 border-white/10"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start relative z-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center gap-1">
              <span className="font-bebas text-3xl md:text-5xl leading-none tracking-tight text-white group-hover:text-brand-chrome transition-colors">
                SUCH<span className="text-brand-steel">GRIME</span>
              </span>
            </div>
            <span className="font-mono text-[8px] md:text-[10px] tracking-widest text-brand-steel uppercase mt-0.5 md:mt-1">
              MKE • WI // Est. 2026
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-mono text-xs tracking-widest uppercase transition-all duration-200 relative py-2",
                    isActive ? "text-white" : "text-brand-steel hover:text-brand-chrome"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-rust" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/submit"
              className="font-mono text-xs tracking-widest uppercase text-brand-black bg-brand-offwhite px-4 py-2 hover:bg-white transition-colors"
            >
              Submit
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-brand-chrome hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-oswald text-4xl uppercase tracking-widest text-brand-chrome hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={() => setMobileMenuOpen(false)}
            className="font-oswald text-4xl uppercase tracking-widest text-brand-rust mt-4"
          >
            Submit Build
          </Link>
        </nav>
      </div>
    </header>
  );
}
