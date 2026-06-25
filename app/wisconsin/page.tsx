import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { GlassCard } from "@/components/marketing/glass-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { buildMetadata } from "@/lib/seo/metadata"
import { itemListSchema, webPageSchema } from "@/lib/seo/schemas/application"
import { getWisconsinLocations, WISCONSIN_SUBREGIONS } from "@/lib/pseo/content/locations"
import { getAllPagesForCollection } from "@/lib/pseo/registry"
import { getServiceMarketingPath } from "@/lib/seo/site-links"
import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: "Custom Software & Business Systems in Wisconsin",
  description:
    "Wisconsin-based custom software, AI automation, and web development studio serving Milwaukee, Madison, Green Bay, and businesses statewide.",
  path: "/wisconsin",
  keywords: [
    "custom software development wisconsin",
    "milwaukee software development",
    "wisconsin business automation",
    "madison web development",
    "wisconsin web development",
  ],
})

export default async function WisconsinPage() {
  const wiLocations = getWisconsinLocations()
  const services = (await getAllPagesForCollection("services")).filter((p) => !p.isMatrix)
  const base = getSiteUrl()

  const itemList = itemListSchema(
    wiLocations.map((l) => ({
      name: `${l.title}, WI`,
      url: `${base}/locations/${l.slug}`,
    })),
  )

  const topMatrixServices = [
    { slug: "custom-software", label: "Custom Software" },
    { slug: "ai-automation", label: "AI & Automation" },
    { slug: "web-development", label: "Web Development" },
  ] as const

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={[
              webPageSchema(
                "Custom Software & Business Systems in Wisconsin",
                siteConfig.description,
                "/wisconsin",
              ),
              itemList,
            ]}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Wisconsin", path: "/wisconsin" }]} />

          <SectionHeading
            label="Primary service area"
            title="Wisconsin"
            description="SuchGrime is headquartered in Milwaukee. We build custom business applications, AI automation, and high-performance websites for operators across Wisconsin — from Southeast manufacturers to Madison startups and Fox Valley service businesses."
            className="mt-8"
          />
          <p className="mt-4 font-mono text-xs text-muted">
            {wiLocations.length} Wisconsin markets · {services.length} services each
          </p>

          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-wide">Services we deliver statewide</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={getServiceMarketingPath(s.slug)} className="group block h-full">
                    <GlassCard hover className="h-full">
                      <span className="font-medium group-hover:text-tech">{s.title}</span>
                      <span className="mt-1 block text-sm text-muted line-clamp-2">{s.description}</span>
                    </GlassCard>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">Top Wisconsin markets</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { city: "milwaukee", label: "Milwaukee" },
                { city: "madison", label: "Madison" },
                { city: "green-bay", label: "Green Bay" },
              ].map(({ city, label }) => (
                <li key={city}>
                  <GlassCard>
                    <Link href={`/locations/${city}`} className="font-display text-xl tracking-wide hover:text-tech">
                      {label}
                    </Link>
                    <ul className="mt-3 space-y-1 text-sm text-muted">
                      {topMatrixServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/locations/${city}/${s.slug}`}
                            className="hover:text-tech"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </li>
              ))}
            </ul>
          </section>

          {WISCONSIN_SUBREGIONS.map((subregion) => {
            const regionPages = wiLocations.filter((p) => p.tags?.includes(subregion))
            if (regionPages.length === 0) return null
            return (
              <section key={subregion} className="mt-16 border-t border-white/10 pt-12">
                <h2 className="font-display text-3xl tracking-wide">{subregion}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {regionPages.map((l) => (
                    <li key={l.slug}>
                      <Link href={`/locations/${l.slug}`} className="group block">
                        <GlassCard hover>
                          <span className="font-medium group-hover:text-tech">{l.title}</span>
                          <span className="mt-1 block text-sm text-muted line-clamp-2">{l.description}</span>
                        </GlassCard>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

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
