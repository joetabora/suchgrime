"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { studio } from "@/lib/demos/studio"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-9 z-40 transition-all duration-300 ${
          scrolled || menuOpen ? "border-b border-white/5 bg-bg/90 backdrop-blur-md" : ""
        }`}
      >
        <nav
          className="flex items-center justify-between px-6 py-5 md:px-12"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="font-ink-display text-lg font-bold uppercase tracking-[0.3em] text-text"
          >
            Deadset
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-text"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            Menu +
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <span className="font-ink-display text-lg font-bold uppercase tracking-[0.3em]">
              Deadset Ink
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
            {studio.navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-baseline gap-4 py-3"
                >
                  <span className="font-mono text-sm text-ink-neon">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-ink-display text-5xl font-bold uppercase tracking-wide text-text transition-colors group-hover:text-ink-accent md:text-7xl">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 p-6">
            <a
              href="#contact"
              onClick={closeMenu}
              className="block w-full bg-ink-accent py-4 text-center font-ink-display text-lg font-semibold uppercase tracking-widest text-text transition-colors hover:bg-ink-accent-hover"
            >
              Book Consult
            </a>
          </div>
        </div>
      )}
    </>
  )
}
