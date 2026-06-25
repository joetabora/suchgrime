import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { GlassCard } from "@/components/marketing/glass-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import type { PseoCollectionId, PseoPage, ResolvedPseoPage } from "@/lib/pseo/types"
import { buildPseoFaqSchema, buildPseoJsonLd } from "@/lib/pseo/schema"
import { getAllPagesForCollection, getCollectionConfig } from "@/lib/pseo/registry"
import { getWisconsinLocations } from "@/lib/pseo/content/locations"
import { getServiceMarketingPath, wisconsinHubLinks } from "@/lib/seo/site-links"
import { siteConfig } from "@/lib/site-config"

interface ProgramDetailProps {
  resolved: ResolvedPseoPage
}

function LinkGrid({
  title,
  items,
}: {
  title: string
  items: { href: string; label: string; description?: string }[]
}) {
  if (items.length === 0) return null
  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <h2 className="font-display text-2xl tracking-wide">{title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="group block h-full">
              <GlassCard hover className="h-full">
                <span className="font-medium text-text group-hover:text-tech">{item.label}</span>
                {item.description && (
                  <span className="mt-1 block text-sm text-muted line-clamp-2">{item.description}</span>
                )}
              </GlassCard>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export async function ProgramDetail({ resolved }: ProgramDetailProps) {
  const { page, collection, breadcrumbs, canonicalPath } = resolved
  const faqSchema = buildPseoFaqSchema(page)
  const jsonLd = buildPseoJsonLd(page, collection, canonicalPath)

  const allPages = await getAllPagesForCollection(collection.id)
  const services = await getAllPagesForCollection("services")
  const caseStudies = await getAllPagesForCollection("case-studies")
  const industries = await getAllPagesForCollection("industries")
  const locations = await getAllPagesForCollection("locations")

  const isMatrixParent = collection.matrixWithServices && !page.isMatrix
  const matrixChildren = isMatrixParent
    ? allPages.filter((p) => p.isMatrix && p.parentSlug === page.slug)
    : []

  const matrixSiblings = page.isMatrix && page.parentSlug
    ? allPages.filter(
        (p) => p.isMatrix && p.parentSlug === page.parentSlug && p.slug !== page.slug,
      )
    : []

  const related = page.isMatrix
    ? matrixSiblings.slice(0, 4)
    : allPages
        .filter((p) => !p.isMatrix && p.slug !== page.slug)
        .slice(0, 4)

  const relatedTitle = page.isMatrix
    ? `More services in ${allPages.find((p) => p.slug === page.parentSlug)?.title ?? "this area"}`
    : `Related ${collection.label}`

  const crossLinks = buildCrossLinks(collection.id, page, {
    services,
    caseStudies,
    industries,
    locations,
    allPages,
  })

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={faqSchema ? [jsonLd, faqSchema] : jsonLd} />
          <Breadcrumbs items={breadcrumbs} />

          {page.tags && (
            <div className="mb-4 flex flex-wrap gap-2">
              {page.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-label mb-2">{collection.singularLabel}</p>
          <h1 className="font-display text-4xl tracking-wide md:text-6xl lg:text-7xl">
            {page.headline ?? page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">{page.intro}</p>

          {page.body && (
            <div className="mt-6 max-w-3xl space-y-4 text-muted">
              {page.body.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          )}

          {page.features && page.features.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {page.features.map((feature) => (
                <li key={feature}>
                  <GlassCard>
                    <p className="text-sm text-muted">{feature}</p>
                  </GlassCard>
                </li>
              ))}
            </ul>
          )}

          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <SectionHeading label="FAQ" title="Common Questions" />
              <div className="mt-8 space-y-4">
                {page.faqs.map((faq) => (
                  <GlassCard key={faq.q}>
                    <h3 className="font-medium text-text">{faq.q}</h3>
                    <p className="mt-2 text-sm text-muted">{faq.a}</p>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            {page.href && (
              <Link
                href={page.href}
                className="inline-block rounded-md bg-parlor-accent px-8 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
              >
                VIEW LIVE DEMO
              </Link>
            )}
            <Link
              href="/contact"
              className="glass glass-border inline-block rounded-md border px-8 py-4 font-display text-xl tracking-wider backdrop-blur-sm transition-colors hover:border-tech/40 hover:text-tech"
            >
              {siteConfig.primaryCta}
            </Link>
          </div>

          {matrixChildren.length > 0 && (
            <LinkGrid
              title={
                collection.id === "locations"
                  ? `Services in ${page.title}`
                  : `${page.title} Services`
              }
              items={matrixChildren.map((m) => ({
                href: `${collection.path}/${m.slug}`,
                label: m.title,
                description: m.description,
              }))}
            />
          )}

          {page.isMatrix && page.parentSlug && page.serviceSlug && (
            <LinkGrid
              title="Explore this topic"
              items={[
                {
                  href: `${collection.path}/${page.parentSlug}`,
                  label: `All services in ${allPages.find((p) => p.slug === page.parentSlug)?.title ?? page.parentSlug}`,
                },
                {
                  href: getServiceMarketingPath(page.serviceSlug),
                  label: `${services.find((s) => s.slug === page.serviceSlug)?.title ?? page.serviceSlug} overview`,
                },
                { href: "/contact", label: siteConfig.primaryCta },
              ]}
            />
          )}

          {crossLinks.map((block) => (
            <LinkGrid key={block.title} title={block.title} items={block.items} />
          ))}

          {related.length > 0 && (
            <LinkGrid
              title={relatedTitle}
              items={related.map((r) => ({
                href: `${collection.path}/${r.slug}`,
                label: r.title,
                description: r.description,
              }))}
            />
          )}
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}

function buildCrossLinks(
  collectionId: PseoCollectionId,
  page: PseoPage,
  ctx: {
    services: PseoPage[]
    caseStudies: PseoPage[]
    industries: PseoPage[]
    locations: PseoPage[]
    allPages: PseoPage[]
  },
): { title: string; items: { href: string; label: string; description?: string }[] }[] {
  const blocks: { title: string; items: { href: string; label: string; description?: string }[] }[] =
    []

  if (collectionId === "locations" && !page.isMatrix) {
    const isWi = page.tags?.includes("Wisconsin")
    blocks.push({
      title: "Industries we serve",
      items: ctx.industries.slice(0, 4).map((i) => ({
        href: `/industries/${i.slug}`,
        label: i.title,
        description: i.description,
      })),
    })
    if (isWi) {
      blocks.push({
        title: "Explore Wisconsin",
        items: [
          { href: "/wisconsin", label: "Wisconsin hub", description: "All Wisconsin markets and service combinations" },
          ...wisconsinHubLinks
            .filter((l) => !l.href.endsWith(page.slug))
            .slice(0, 5)
            .map((l) => ({ href: l.href, label: l.label })),
        ],
      })
    }
  }

  if (collectionId === "industries" && !page.isMatrix) {
    const wiLocs = getWisconsinLocations().slice(0, 4)
    blocks.push({
      title: "Wisconsin markets",
      items: wiLocs.map((l) => ({
        href: `/locations/${l.slug}`,
        label: `${l.title}, WI`,
        description: l.description,
      })),
    })
    blocks.push({
      title: "National markets",
      items: ctx.locations.filter((l) => !l.tags?.includes("Wisconsin")).slice(0, 4).map((l) => ({
        href: `/locations/${l.slug}`,
        label: l.title,
        description: l.description,
      })),
    })
    const matchedStudies = ctx.caseStudies.filter((c) => c.tags?.includes(page.slug))
    if (matchedStudies.length > 0) {
      blocks.push({
        title: "Related case studies",
        items: matchedStudies.map((c) => ({
          href: `/case-studies/${c.slug}`,
          label: c.title,
          description: c.description,
        })),
      })
    }
  }

  if (collectionId === "services") {
    const locConfig = getCollectionConfig("locations")
    const wiLocs = getWisconsinLocations().slice(0, 4)
    blocks.push({
      title: "Wisconsin markets for this service",
      items: wiLocs.map((l) => ({
        href: `${locConfig.path}/${l.slug}/${page.slug}`,
        label: `${page.title} in ${l.title}, WI`,
      })),
    })
    blocks.push({
      title: "National markets for this service",
      items: ctx.locations.filter((l) => !l.tags?.includes("Wisconsin")).slice(0, 4).map((l) => ({
        href: `${locConfig.path}/${l.slug}/${page.slug}`,
        label: `${page.title} in ${l.title}`,
      })),
    })
    const marketingPath = getServiceMarketingPath(page.slug)
    if (marketingPath !== `/services/${page.slug}`) {
      blocks.push({
        title: "Learn more",
        items: [{ href: marketingPath, label: `${page.title} overview` }],
      })
    }
  }

  if (collectionId === "case-studies") {
    blocks.push({
      title: "Explore solutions",
      items: [
        ...ctx.services.slice(0, 3).map((s) => ({
          href: getServiceMarketingPath(s.slug),
          label: s.title,
          description: s.description,
        })),
        ...ctx.industries.slice(0, 2).map((i) => ({
          href: `/industries/${i.slug}`,
          label: i.title,
          description: i.description,
        })),
      ],
    })
  }

  if (page.isMatrix && page.serviceSlug) {
    const parentSlug = page.parentSlug ?? ""
    let matchedCaseStudies = ctx.caseStudies
      .filter((c) => c.tags?.includes(parentSlug) || c.tags?.includes(page.serviceSlug!))
      .slice(0, 2)
    if (matchedCaseStudies.length === 0) {
      matchedCaseStudies = ctx.caseStudies.slice(0, 2)
    }
    if (matchedCaseStudies.length > 0) {
      blocks.push({
        title: "Related work",
        items: matchedCaseStudies.map((c) => ({
          href: `/case-studies/${c.slug}`,
          label: c.title,
          description: c.description,
        })),
      })
    }
  }

  return blocks
}
