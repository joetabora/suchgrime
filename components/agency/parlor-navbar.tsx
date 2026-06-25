"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function ParlorNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-bg/80 backdrop-blur-md">
        <nav
          className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-stretch lg:grid-cols-[auto_1fr_auto]"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex flex-col justify-center border-r border-white/10 px-6 py-4 transition-colors hover:bg-white/[0.03]"
          >
            <span className="font-display text-2xl leading-none tracking-wider">
              {siteConfig.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tech">
              {siteConfig.subtitle}
            </span>
          </Link>

          <ul className="hidden items-stretch lg:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  className="flex items-center border-r border-white/10 px-5 text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-stretch">
            <Link
              href={siteConfig.primaryCtaHref}
              className="hidden items-center bg-parlor-accent px-6 text-sm font-semibold uppercase tracking-wider text-text transition-colors hover:bg-parlor-accent/80 lg:flex"
            >
              {siteConfig.primaryCta}
            </Link>
            <button
              type="button"
              className="flex min-h-[56px] min-w-[56px] items-center justify-center border-l border-white/10 px-6 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-lg">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <span className="font-display text-3xl tracking-wider">SUCHGRIME</span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex min-h-11 min-w-11 items-center justify-center border border-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center px-6">
            {siteConfig.navLinks.map((link, i) => (
              <li key={link.href} className="border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 py-6"
                >
                  <span className="font-mono text-sm text-tech">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-5xl tracking-wide md:text-7xl">
                    {link.label.toUpperCase()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={siteConfig.primaryCtaHref}
            onClick={closeMenu}
            className="block border-t border-white/10 bg-parlor-accent py-6 text-center font-display text-2xl tracking-wider text-text"
          >
            {siteConfig.primaryCta.toUpperCase()}
          </Link>
        </div>
      )}
    </>
  )
}
