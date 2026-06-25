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
    <footer className="border-t border-white/8 bg-bg-elevated paper-grain">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="display-heading text-2xl text-text">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Link href={siteConfig.primaryCtaHref} className="text-purple hover:underline">
                {siteConfig.primaryCta} →
              </Link>
              <Link href="/custom-software" className="text-muted hover:text-purple">
                Custom Software
              </Link>
              <Link href="/ai-automation" className="text-muted hover:text-purple">
                AI Automation
              </Link>
            </div>
          </div>

          <div>
            <p className="text-label mb-3">Explore</p>
            <ul className="space-y-2 text-sm">
              {footerCollections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-purple">
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
                  <Link href={link.href} className="text-muted hover:text-purple">
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
                  <Link href={link.href} className="text-muted hover:text-purple">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerTopServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-purple">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="printer-rule mt-10 w-full" aria-hidden="true" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
          <p className="text-label">{siteConfig.domain}</p>
          <p className="text-label">
            © {new Date().getFullYear()} · Built in Wisconsin · Systems that run businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
