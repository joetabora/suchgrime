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
import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: "Case Studies — Custom Software & Business Systems",
  description:
    "Case studies and project capabilities — internal dashboards, customer portals, event management systems, and high-performance websites built by SuchGrime.",
  path: "/case-studies",
  keywords: [
    "custom software case studies",
    "business automation examples",
    "internal dashboard development",
    "client portal development",
    siteConfig.name,
  ],
})

export default async function CaseStudiesPage() {
  const pages = await getAllPagesForCollection("case-studies")
  const basePages = pages.filter((p) => !p.isMatrix)

  const itemList = itemListSchema(
    basePages.map((p) => ({
      name: p.title,
      url: `${getSiteUrl()}/case-studies/${p.slug}`,
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
                "Case Studies",
                "Custom software, automation, and web project capabilities from SuchGrime.",
                "/case-studies",
              ),
              itemList,
            ]}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }]} />

          <SectionHeading
            label="Case Studies"
            title="Real Systems, Real Capabilities"
            description="From internal booking admin to customer-facing platforms and event management — outcomes and capabilities, not inflated metrics."
            className="mt-8"
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {siteConfig.featuredProjects.map((project) => (
              <Link key={project.slug} href={project.href} className="group block h-full">
                <GlassCard hover className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-tech">
                        {project.category}
                      </p>
                      <h2 className="mt-1 font-display text-2xl tracking-wide md:text-3xl">
                        {project.title}
                      </h2>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech" />
                  </div>
                  <p className="mt-3 text-muted">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Link>
            ))}
          </div>

          {basePages.length > 0 && (
            <section className="mt-20 border-t border-white/10 pt-16">
              <SectionHeading
                label="Detailed Case Studies"
                title="Explore Individual Projects"
              />
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {basePages.map((page) => (
                  <Link key={page.slug} href={`/case-studies/${page.slug}`} className="group block">
                    <GlassCard hover>
                      <h3 className="font-display text-xl tracking-wide group-hover:text-tech">
                        {page.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted line-clamp-3">{page.description}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 border-t border-white/10 pt-16">
            <Link
              href="/contact"
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
