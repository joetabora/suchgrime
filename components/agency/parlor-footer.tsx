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
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl tracking-wider text-text">
              {siteConfig.name.toUpperCase()}
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">{siteConfig.description}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link
                href="/contact"
                className="text-tech hover:underline"
              >
                {siteConfig.primaryCta} →
              </Link>
              <Link href="/custom-software" className="text-muted hover:text-tech">
                Custom Software
              </Link>
              <Link href="/ai-automation" className="text-muted hover:text-tech">
                AI Automation
              </Link>
            </div>
          </div>

          <div>
            <p className="text-label mb-3">Explore</p>
            <ul className="space-y-2 text-sm">
              {footerCollections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-tech">
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
                  <Link href={link.href} className="text-muted hover:text-tech">
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
                  <Link href={link.href} className="text-muted hover:text-tech">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerTopServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-tech">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-muted md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest">{siteConfig.domain}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} · Built in Wisconsin · Systems that run businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
