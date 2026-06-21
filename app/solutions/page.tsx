import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { webPageSchema } from "@/lib/seo/schemas/application"
import { buildMetadata } from "@/lib/seo/metadata"
import { getWisconsinLocations } from "@/lib/pseo/content/locations"
import { getAllPagesForCollection } from "@/lib/pseo/registry"

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Explore SuchGrime solutions by industry, location, and service — web development, automation, and booking systems.",
  path: "/solutions",
})

export default async function SolutionsPage() {
  const [services, industries, locations] = await Promise.all([
    getAllPagesForCollection("services"),
    getAllPagesForCollection("industries"),
    getAllPagesForCollection("locations"),
  ])

  const baseServices = services.filter((p) => !p.isMatrix)
  const baseIndustries = industries.filter((p) => !p.isMatrix)
  const wiLocations = getWisconsinLocations().slice(0, 8)
  const baseLocations = locations.filter((p) => !p.isMatrix && !p.tags?.includes("Wisconsin")).slice(0, 8)

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={webPageSchema(
              "Solutions",
              "Explore SuchGrime solutions by industry, location, and service.",
              "/solutions",
            )}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }]} />
          <p className="text-label mb-2">Solutions hub</p>
          <h1 className="font-display text-6xl tracking-wide md:text-8xl">FIND YOUR FIT</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Browse services, industries, and markets — then dive into programmatic landing pages built for search intent.
          </p>

          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-wide">Services</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {baseServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="block border border-white/10 p-4 hover:border-parlor-accent/50">
                    <span className="font-medium">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">Industries</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {baseIndustries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="block border border-white/10 p-4 hover:border-parlor-accent/50">
                    <span className="font-medium">{i.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">Wisconsin markets</h2>
            <p className="mt-2 text-sm text-muted">SuchGrime is Milwaukee-based — explore our primary service area.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {wiLocations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="block border border-white/10 p-4 hover:border-parlor-accent/50">
                    <span className="font-medium">{l.title}, WI</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/wisconsin" className="mt-4 inline-block text-sm text-parlor-accent hover:underline">
              View all Wisconsin markets →
            </Link>
          </section>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">National markets</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {baseLocations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="block border border-white/10 p-4 hover:border-parlor-accent/50">
                    <span className="font-medium">{l.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/locations" className="mt-4 inline-block text-sm text-parlor-accent hover:underline">
              View all locations →
            </Link>
          </section>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
