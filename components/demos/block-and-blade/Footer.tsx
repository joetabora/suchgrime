"use client"
import { ArrowUp, AtSign, Mail, Phone } from "lucide-react"
import { shop } from "@/lib/demos/shop"

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="border-t border-white/5 bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-3xl tracking-wider">
              BLOCK <span className="text-accent">&</span> BLADE
            </p>
            <p className="mt-2 text-sm text-muted">{shop.tagline}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted">
            <a
              href={`tel:${shop.location.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-text"
            >
              <Phone className="h-4 w-4" />
              {shop.location.phone}
            </a>
            <a
              href={`mailto:${shop.location.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-text"
            >
              <Mail className="h-4 w-4" />
              {shop.location.email}
            </a>
            <a
              href={`https://instagram.com/${shop.location.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-text"
            >
              <AtSign className="h-4 w-4" />
              {shop.location.instagram}
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 items-center gap-2 self-start border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-text"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {shop.name} Barbershop. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
