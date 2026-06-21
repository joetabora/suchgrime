import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { Badge } from "@/components/ui/badge"
import type { ResolvedPseoPage } from "@/lib/pseo/types"
import { buildPseoFaqSchema, buildPseoJsonLd } from "@/lib/pseo/schema"
import { getAllPagesForCollection } from "@/lib/pseo/registry"

interface ProgramDetailProps {
  resolved: ResolvedPseoPage
}

export function ProgramDetail({ resolved }: ProgramDetailProps) {
  const { page, collection, breadcrumbs, canonicalPath } = resolved
  const faqSchema = buildPseoFaqSchema(page)
  const jsonLd = buildPseoJsonLd(page, collection, canonicalPath)

  const related = getAllPagesForCollection(collection.id)
    .filter((p) => !p.isMatrix && p.slug !== page.slug && !page.isMatrix)
    .slice(0, 4)

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={faqSchema ? [jsonLd, faqSchema] : jsonLd} />
          <Breadcrumbs items={breadcrumbs} />

          {page.tags && (
            <div className="mb-4 flex flex-wrap gap-2">
              {page.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-label mb-2">{collection.singularLabel}</p>
          <h1 className="font-display text-5xl tracking-wide md:text-7xl">
            {(page.headline ?? page.title).toUpperCase()}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">{page.intro}</p>

          {page.body && <p className="mt-4 max-w-3xl text-muted">{page.body}</p>}

          {page.features && page.features.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {page.features.map((feature) => (
                <li key={feature} className="border border-white/10 p-4 text-sm text-muted">
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <h2 className="font-display text-3xl tracking-wide">FAQ</h2>
              <div className="mt-6 space-y-6">
                {page.faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-semibold text-text">{faq.q}</h3>
                    <p className="mt-2 text-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            {page.href && (
              <Link
                href={page.href}
                className="inline-block bg-parlor-accent px-8 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
              >
                VIEW LIVE DEMO
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-block border border-white/20 px-8 py-4 font-display text-xl tracking-wider transition-colors hover:border-parlor-accent hover:text-parlor-accent"
            >
              START A PROJECT
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <h2 className="font-display text-2xl tracking-wide">Related {collection.label}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`${collection.path}/${r.slug}`}
                      className="block border border-white/10 p-4 text-sm transition-colors hover:border-parlor-accent/50"
                    >
                      <span className="font-medium text-text">{r.title}</span>
                      <span className="mt-1 block text-muted line-clamp-2">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
