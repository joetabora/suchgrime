import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PseoCollectionConfig, PseoPage } from "@/lib/pseo/types"
import { collectionPageSchema } from "@/lib/seo/schemas/application"

interface ProgramIndexProps {
  collection: PseoCollectionConfig
  pages: PseoPage[]
}

export function ProgramIndex({ collection, pages }: ProgramIndexProps) {
  const basePages = pages.filter((p) => !p.isMatrix)

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={collectionPageSchema(collection.indexTitle, collection.indexDescription, collection.path)}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: collection.label, path: collection.path }]} />
          <p className="text-label mb-2">{collection.label}</p>
          <h1 className="font-display text-6xl tracking-wide md:text-8xl">{collection.indexTitle.toUpperCase()}</h1>
          <p className="mt-4 max-w-2xl text-muted">{collection.indexDescription}</p>
          <p className="mt-2 font-mono text-xs text-muted">{basePages.length} pages · programmatic SEO</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {basePages.map((page) => (
              <Card key={page.slug}>
                <CardHeader>
                  {page.tags && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {page.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <CardTitle>
                    <Link href={`${collection.path}/${page.slug}`} className="hover:text-parlor-accent">
                      {page.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                {page.href && (
                  <CardContent>
                    <Link href={page.href} className="text-sm text-parlor-accent hover:underline">
                      View live demo →
                    </Link>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
