import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { footerTopLocations, footerTopServices } from "@/lib/seo/site-links"

export default function NotFound() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-24 md:px-12">
          <p className="text-label mb-2">404</p>
          <h1 className="font-display text-6xl tracking-wide md:text-8xl">PAGE NOT FOUND</h1>
          <p className="mt-4 max-w-xl text-muted">This URL doesn&apos;t exist — try one of these popular destinations.</p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl tracking-wide">Services</h2>
              <ul className="mt-4 space-y-2">
                {footerTopServices.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-parlor-accent hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl tracking-wide">Locations</h2>
              <ul className="mt-4 space-y-2">
                {footerTopLocations.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-parlor-accent hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/" className="bg-parlor-accent px-6 py-3 font-display tracking-wider text-text">
              HOME
            </Link>
            <Link href="/blog" className="border border-white/20 px-6 py-3 font-display tracking-wider hover:border-parlor-accent">
              BLOG
            </Link>
            <Link href="/contact" className="border border-white/20 px-6 py-3 font-display tracking-wider hover:border-parlor-accent">
              CONTACT
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
