import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import {
  footerCollections,
  footerTopIndustries,
  footerTopLocations,
  footerTopServices,
} from "@/lib/seo/site-links"

export function ParlorFooter() {
  return (
    <footer className="border-t border-white/10 bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl tracking-wide text-text">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Link href={siteConfig.primaryCtaHref} className="text-parlor-accent hover:underline">
                {siteConfig.primaryCta} →
              </Link>
              <Link href="/custom-software" className="text-muted hover:text-parlor-accent">
                Custom Software
              </Link>
              <Link href="/ai-automation" className="text-muted hover:text-parlor-accent">
                AI Automation
              </Link>
            </div>
          </div>

          <div>
            <p className="text-label mb-3">Explore</p>
            <ul className="space-y-2 text-sm">
              {footerCollections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-parlor-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-3">Top locations</p>
            <ul className="space-y-2 text-sm">
              {footerTopLocations.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-parlor-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-3">Industries & services</p>
            <ul className="space-y-2 text-sm">
              {footerTopIndustries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-parlor-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerTopServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-parlor-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
          <p className="text-label">{siteConfig.domain}</p>
          <p className="text-label">
            © {new Date().getFullYear()} · Built in Wisconsin · Systems that run businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
