import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { buildMetadata } from "@/lib/seo/metadata"
import { collectionPageSchema, itemListSchema } from "@/lib/seo/schemas/application"
import { getAllPagesForCollection } from "@/lib/pseo/registry"
import { getServiceMarketingPath } from "@/lib/seo/site-links"
import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: "Services — Custom Software, AI Automation & Web Systems",
  description:
    "Custom business applications, AI automation, web development, e-commerce, and booking systems for Wisconsin businesses and operators nationwide.",
  path: "/services",
  keywords: [
    "custom software development",
    "AI automation services",
    "business automation wisconsin",
    "web development services",
    "milwaukee software development",
    siteConfig.name,
  ],
})

export default async function ServicesPage() {
  const pages = await getAllPagesForCollection("services")
  const basePages = pages.filter((p) => !p.isMatrix)

  const itemList = itemListSchema(
    basePages.map((p) => ({
      name: p.title,
      url: `${getSiteUrl()}/services/${p.slug}`,
    })),
  )

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={[
              collectionPageSchema(
                "Services",
                "Custom software, AI automation, and web systems from SuchGrime.",
                "/services",
              ),
              itemList,
            ]}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />

          <SectionHeading
            label="Services"
            title="Systems Built For How You Operate"
            description="Custom business applications, AI automation, professional websites, and e-commerce — engineered around your workflow, not someone else's template."
            className="mt-8"
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {basePages.map((service) => (
              <Link
                key={service.slug}
                href={getServiceMarketingPath(service.slug)}
                className="group block h-full"
              >
                <GlassCard hover className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl tracking-wide md:text-3xl">{service.title}</h2>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech" />
                  </div>
                  <p className="mt-3 text-muted">{service.description}</p>
                  {service.features && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {service.features.slice(0, 4).map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </Link>
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading
              label="Programmatic SEO"
              title="Services By Location & Industry"
              description="Explore location and industry-specific landing pages for every service combination."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/locations" className="text-tech hover:underline">
                Browse by location →
              </Link>
              <Link href="/industries" className="text-muted hover:text-tech">
                Browse by industry →
              </Link>
              <Link href="/wisconsin" className="text-muted hover:text-tech">
                Wisconsin hub →
              </Link>
            </div>
          </section>

          <div className="mt-16 border-t border-white/10 pt-16">
            <Link
              href={siteConfig.primaryCtaHref}
              className="inline-block rounded-md bg-parlor-accent px-8 py-3 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              {siteConfig.primaryCta}
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
