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
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-bg/85 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-[1400px] items-stretch justify-between px-4 md:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex flex-col justify-center py-4 pr-6 transition-colors hover:opacity-80"
          >
            <span className="display-heading text-2xl leading-none text-text">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 font-body text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
              {siteConfig.subtitle}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.primaryCtaHref}
              className="hidden items-center rounded-sm bg-parlor-accent px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-parlor-accent/85 lg:flex"
            >
              {siteConfig.primaryCta}
            </Link>
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-white/10 lg:hidden"
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
        <div className="fixed inset-0 z-50 flex flex-col bg-bg/97 backdrop-blur-lg paper-grain">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <span className="display-heading text-3xl text-text">{siteConfig.name}</span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center px-6">
            {siteConfig.navLinks.map((link, i) => (
              <li key={link.href} className="border-b border-white/8">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-4 py-6"
                >
                  <span className="font-mono text-sm text-purple/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-heading text-4xl text-text md:text-5xl">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={siteConfig.primaryCtaHref}
            onClick={closeMenu}
            className="block border-t border-white/8 bg-parlor-accent py-6 text-center display-heading text-2xl text-text"
          >
            {siteConfig.primaryCta}
          </Link>
        </div>
      )}
    </>
  )
}
