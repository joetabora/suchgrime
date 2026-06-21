import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { collectionPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Services",
  description: "Web development, business automation, e-commerce, and booking systems from SuchGrime.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={collectionPageSchema(
              "Services",
              "Web development, business automation, e-commerce, and booking systems from SuchGrime.",
              "/services",
            )}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
          <p className="text-label mb-2">Capabilities</p>
          <h1 className="font-display text-5xl tracking-wide md:text-7xl">WHAT WE BUILD</h1>
          <p className="mt-4 max-w-2xl text-muted">{siteConfig.description}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {siteConfig.servicePages.map((service) => (
              <Card key={service.slug}>
                <CardHeader>
                  <CardTitle>{service.title.toUpperCase()}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/services/${service.slug}`} className="text-sm text-parlor-accent hover:underline">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
