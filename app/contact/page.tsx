import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { ContactForm } from "@/components/agency/parlor-contact"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { localBusinessSchema } from "@/lib/seo/schemas/organization"
import { JsonLd } from "@/components/seo/json-ld"
import { Mail } from "lucide-react"

export const metadata = buildMetadata({
  title: "Contact",
  description: `Start a project with ${siteConfig.name}. Web development and business automation inquiries welcome.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <JsonLd data={localBusinessSchema()} />
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10">
          <div className="px-6 py-12 md:px-12">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="border-t border-white/10 p-6 md:p-12 lg:border-r">
              <p className="text-label mb-4">{siteConfig.contact.note}</p>
              <h1 className="font-display text-5xl leading-[0.9] tracking-wide md:text-7xl lg:text-8xl">
                START
                <br />A PROJECT
              </h1>
              <p className="mt-6 max-w-md text-muted">
                Tell us about your brand, your goals, and the systems you need built.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-parlor-accent transition-colors hover:text-parlor-accent/80"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contact.email}
              </a>
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
