import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { siteConfig } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo/metadata"
import { serviceSchema, serviceFaqSchema } from "@/lib/seo/schemas/service"
import { JsonLd } from "@/components/seo/json-ld"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return siteConfig.servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const service = siteConfig.servicePages.find((s) => s.slug === slug)
  if (!service) return {}
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = siteConfig.servicePages.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={[serviceSchema(service), serviceFaqSchema(service)]} />
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${slug}` },
            ]}
          />
          <p className="text-label mb-2">Service</p>
          <h1 className="font-display text-5xl tracking-wide md:text-7xl">{service.title.toUpperCase()}</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">{service.longDescription}</p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature} className="border border-white/10 p-4 text-sm text-muted">
                {feature}
              </li>
            ))}
          </ul>

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="font-display text-3xl tracking-wide">FAQ</h2>
            <div className="mt-6 space-y-6">
              {service.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-text">{faq.q}</h3>
                  <p className="mt-2 text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <Link
            href="/contact"
            className="mt-12 inline-block bg-parlor-accent px-8 py-4 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
          >
            START A PROJECT
          </Link>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
