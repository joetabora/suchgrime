import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { buildMetadata } from "@/lib/seo/metadata"
import { itemListSchema, webPageSchema } from "@/lib/seo/schemas/application"
import { getWisconsinLocations, WISCONSIN_SUBREGIONS } from "@/lib/pseo/content/locations"
import { getAllPagesForCollection } from "@/lib/pseo/registry"
import { getSiteUrl } from "@/lib/utils"

export const metadata = buildMetadata({
  title: "Web Development & Automation in Wisconsin",
  description:
    "Milwaukee-based web development and business automation agency serving Wisconsin — custom Next.js sites, booking systems, and workflow automation statewide.",
  path: "/wisconsin",
  keywords: [
    "web development wisconsin",
    "milwaukee web agency",
    "wisconsin business automation",
    "website design wisconsin",
    "madison web development",
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

  const topMatrixLinks = [
    { city: "milwaukee", label: "Milwaukee" },
    { city: "madison", label: "Madison" },
    { city: "green-bay", label: "Green Bay" },
  ]

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={[
              webPageSchema(
                "Web Development & Automation in Wisconsin",
                "Milwaukee-based agency serving Wisconsin businesses with Next.js websites and workflow automation.",
                "/wisconsin",
              ),
              itemList,
            ]}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Wisconsin", path: "/wisconsin" }]} />
          <p className="text-label mb-2">Primary service area</p>
          <h1 className="font-display text-6xl tracking-wide md:text-8xl">WISCONSIN</h1>
          <p className="mt-4 max-w-2xl text-muted">
            SuchGrime is headquartered in Milwaukee. We build fast, SEO-ready websites and business automation for
            operators across Wisconsin — from Southeast Wisconsin manufacturers to Madison startups and Fox Valley
            service businesses.
          </p>
          <p className="mt-2 font-mono text-xs text-muted">{wiLocations.length} Wisconsin markets · 3 services each</p>

          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-wide">Services we deliver statewide</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block border border-white/10 p-4 hover:border-parlor-accent/50"
                  >
                    <span className="font-medium">{s.title}</span>
                    <span className="mt-1 block text-sm text-muted line-clamp-2">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">Popular Wisconsin combinations</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topMatrixLinks.flatMap(({ city, label }) =>
                services.map((s) => (
                  <li key={`${city}-${s.slug}`}>
                    <Link
                      href={`/locations/${city}/${s.slug}`}
                      className="block border border-white/10 p-4 text-sm hover:border-parlor-accent/50"
                    >
                      <span className="font-medium">{s.title} in {label}</span>
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </section>

          {WISCONSIN_SUBREGIONS.map((subregion) => {
            const cities = wiLocations.filter((l) => l.tags?.includes(subregion))
            if (cities.length === 0) return null
            return (
              <section key={subregion} className="mt-16 border-t border-white/10 pt-12">
                <h2 className="font-display text-3xl tracking-wide">{subregion}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {cities.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/locations/${l.slug}`}
                        className="block border border-white/10 p-4 hover:border-parlor-accent/50"
                      >
                        <span className="font-medium">{l.title}</span>
                        <span className="mt-1 block text-xs text-muted line-clamp-2">{l.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

          <div className="mt-16 border-t border-white/10 pt-12">
            <Link
              href="/contact"
              className="inline-block bg-parlor-accent px-8 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              START A WISCONSIN PROJECT
            </Link>
            <Link
              href="/locations"
              className="ml-4 inline-block border border-white/20 px-8 py-4 font-display text-xl tracking-wider transition-colors hover:border-parlor-accent"
            >
              ALL LOCATIONS
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
