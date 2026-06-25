import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { GlassCard } from "@/components/marketing/glass-card"
import type { PseoCollectionConfig, PseoPage } from "@/lib/pseo/types"
import { WISCONSIN_SUBREGIONS } from "@/lib/pseo/content/locations"
import { collectionPageSchema, itemListSchema } from "@/lib/seo/schemas/application"
import { getSiteUrl } from "@/lib/utils"

interface ProgramIndexProps {
  collection: PseoCollectionConfig
  pages: PseoPage[]
}

function IndexCard({
  page,
  collection,
  matrixPages,
}: {
  page: PseoPage
  collection: PseoCollectionConfig
  matrixPages: PseoPage[]
}) {
  return (
    <Link href={`${collection.path}/${page.slug}`} className="group block h-full">
      <GlassCard hover className="h-full">
        {page.tags && (
          <div className="mb-3 flex flex-wrap gap-2">
            {page.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-display text-xl tracking-wide group-hover:text-tech">{page.title}</h2>
        <p className="mt-2 text-sm text-muted line-clamp-3">{page.description}</p>
        {collection.matrixWithServices && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted">Services</p>
            <ul className="space-y-1 text-sm">
              {matrixPages
                .filter((m) => m.parentSlug === page.slug)
                .slice(0, 5)
                .map((m) => (
                  <li key={m.slug} className="text-muted group-hover:text-text">
                    {m.title}
                  </li>
                ))}
            </ul>
          </div>
        )}
        {page.href && (
          <p className="mt-4 text-sm text-tech">View live demo →</p>
        )}
      </GlassCard>
    </Link>
  )
}

export function ProgramIndex({ collection, pages }: ProgramIndexProps) {
  const basePages = pages.filter((p) => !p.isMatrix)
  const matrixPages = pages.filter((p) => p.isMatrix)
  const matrixPreview = matrixPages.slice(0, 12)

  const wiPages = collection.id === "locations" ? basePages.filter((p) => p.tags?.includes("Wisconsin")) : []
  const nationalPages =
    collection.id === "locations" ? basePages.filter((p) => !p.tags?.includes("Wisconsin")) : basePages

  const itemList = itemListSchema(
    basePages.map((p) => ({
      name: p.title,
      url: `${getSiteUrl()}${collection.path}/${p.slug}`,
    })),
  )

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={[collectionPageSchema(collection.indexTitle, collection.indexDescription, collection.path), itemList]}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: collection.label, path: collection.path }]} />
          <p className="text-label mb-2">{collection.label}</p>
          <h1 className="font-display text-4xl tracking-wide md:text-6xl lg:text-7xl">{collection.indexTitle}</h1>
          <p className="mt-4 max-w-2xl text-muted">{collection.indexDescription}</p>
          <p className="mt-2 font-mono text-xs text-muted">
            {basePages.length} pages
            {matrixPages.length > 0 && ` · ${matrixPages.length} service combinations`}
          </p>

          {collection.id === "locations" && wiPages.length > 0 && (
            <>
              <div className="mt-8 flex items-center gap-4">
                <Link href="/wisconsin" className="text-sm text-tech hover:underline">
                  Wisconsin hub →
                </Link>
              </div>
              {WISCONSIN_SUBREGIONS.map((subregion) => {
                const regionPages = wiPages.filter((p) => p.tags?.includes(subregion))
                if (regionPages.length === 0) return null
                return (
                  <section key={subregion} className="mt-12">
                    <h2 className="font-display text-3xl tracking-wide">Wisconsin — {subregion}</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {regionPages.map((page) => (
                        <IndexCard
                          key={page.slug}
                          page={page}
                          collection={collection}
                          matrixPages={matrixPages}
                        />
                      ))}
                    </div>
                  </section>
                )
              })}
            </>
          )}

          {collection.id === "locations" && nationalPages.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <h2 className="font-display text-3xl tracking-wide">National markets</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nationalPages.map((page) => (
                  <IndexCard key={page.slug} page={page} collection={collection} matrixPages={matrixPages} />
                ))}
              </div>
            </section>
          )}

          {collection.id !== "locations" && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {basePages.map((page) => (
                <IndexCard key={page.slug} page={page} collection={collection} matrixPages={matrixPages} />
              ))}
            </div>
          )}

          {matrixPreview.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <h2 className="font-display text-3xl tracking-wide">Service combinations</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Programmatic pages targeting service + {collection.id === "locations" ? "city" : "industry"} search
                intent.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {matrixPreview.map((m) => (
                  <li key={m.slug}>
                    <Link href={`${collection.path}/${m.slug}`} className="group block h-full">
                      <GlassCard hover className="h-full">
                        <span className="font-medium text-text group-hover:text-tech">{m.title}</span>
                        <span className="mt-1 block text-sm text-muted line-clamp-2">{m.description}</span>
                      </GlassCard>
                    </Link>
                  </li>
                ))}
              </ul>
              {matrixPages.length > matrixPreview.length && (
                <p className="mt-4 font-mono text-xs text-muted">
                  + {matrixPages.length - matrixPreview.length} more combinations indexed in sitemap
                </p>
              )}
            </section>
          )}
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
