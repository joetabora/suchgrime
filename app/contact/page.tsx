import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { ContactForm } from "@/components/agency/parlor-contact"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { Mail, Phone } from "lucide-react"

export const metadata = buildMetadata({
  title: "Book A Strategy Call — Contact SuchGrime",
  description:
    "Book a strategy call with SuchGrime. Tell us about your workflows, pain points, and goals — we'll outline what custom software, automation, or web systems could look like for your business.",
  path: "/contact",
  keywords: [
    "book strategy call",
    "custom software consultation",
    "business automation wisconsin",
    "milwaukee software development",
    siteConfig.name,
  ],
})

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10">
          <div className="px-6 py-12 md:px-12">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="border-t border-white/10 p-6 md:p-12 lg:border-r">
              <p className="text-label mb-4">{siteConfig.contact.note}</p>
              <h1 className="font-display text-5xl leading-[0.9] tracking-wide md:text-7xl">
                {siteConfig.primaryCta.toUpperCase()}
              </h1>
              <p className="mt-6 max-w-md text-muted">
                Tell us about your workflows, manual bottlenecks, and goals. We&apos;ll map what custom software, automation, or web systems could look like for your business — no obligation.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 font-mono text-sm text-tech transition-colors hover:text-tech/80"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-text"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted">
                Built in Wisconsin · Serving nationwide
              </p>
            </div>
            <div className="border-t border-white/10 p-6 md:p-12">
              <ContactForm idPrefix="contact-page" />
            </div>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
