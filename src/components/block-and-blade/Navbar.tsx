import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { shop } from "../../data/shop"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
    <header
      className={`fixed inset-x-0 top-9 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/5 bg-bg/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="font-display text-2xl tracking-wider text-text md:text-3xl"
        >
          BLOCK <span className="text-accent">&</span> BLADE
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {shop.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-bg transition-colors hover:bg-accent-hover"
          >
            Book a Cut
          </a>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-[108px] z-30 flex flex-col bg-bg px-6 py-8 md:hidden">
          <ul className="flex flex-col gap-6">
            {shop.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="font-display text-4xl tracking-wide text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-bg"
          >
            Book a Cut
          </a>
        </div>
      )}
    </header>
  )
}
