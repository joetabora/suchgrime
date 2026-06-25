import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { buildMetadata } from "@/lib/seo/metadata"
import { faqSchema, serviceSchema } from "@/lib/seo/schemas/faq"
import { siteConfig } from "@/lib/site-config"

const path = "/web-design"

const capabilities = siteConfig.websiteServices.items

const faqs = [
  {
    q: "Do you build websites only, or full business systems?",
    a: "Both. Websites are often the front door, but we also build the internal dashboards, customer portals, and automation behind them. Every web project is engineered with performance, SEO, and long-term scalability in mind.",
  },
  {
    q: "What makes your websites different from template agencies?",
    a: "We use Next.js, TypeScript, and custom engineering — not WordPress themes or page builders. You get Core Web Vitals optimization, structured data, accessibility, and a codebase your team can extend.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. We handle full redesigns with content migration, SEO preservation, and performance improvements — often pairing a new site with automation or custom tools your team needs.",
  },
  {
    q: "Do you handle SEO for Wisconsin and local markets?",
    a: "Yes. We build technical SEO foundations — metadata, schema markup, sitemaps, and location-aware content structures — targeting both local Wisconsin searches and national visibility.",
  },
]

export const metadata = buildMetadata({
  title: "Professional Web Design & Development — Wisconsin",
  description:
    "High-performance business websites, e-commerce, landing pages, and SEO foundations built with Next.js. Milwaukee and Wisconsin web development with engineering discipline.",
  path,
  keywords: [
    "milwaukee web design",
    "wisconsin web development",
    "professional web design",
    "business website development",
    "next.js web development",
    "high performance websites",
    siteConfig.name,
  ],
})

export default function WebDesignPage() {
  const service = serviceSchema({
    name: "Professional Websites & Web Design",
    description: siteConfig.websiteServices.description,
    path,
    serviceType: "Web Design",
  })

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={[service, faqSchema(faqs)]} />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Web Design", path }]} />

          <SectionHeading
            label="Professional Websites"
            title={siteConfig.websiteServices.headline}
            description={siteConfig.websiteServices.description}
            className="mt-8"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <GlassCard key={cap}>
                <p className="font-display text-lg tracking-wide">{cap}</p>
              </GlassCard>
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading
              label="Engineering-Grade Web"
              title="Websites Built With The Same Stack As Our Custom Software"
              description="Every site ships with server-side rendering, structured data, accessibility patterns, and Core Web Vitals optimization — not bolted on after launch."
            />
            <ul className="mt-8 space-y-3 text-muted">
              <li>Next.js App Router with TypeScript</li>
              <li>Mobile-first responsive design</li>
              <li>JSON-LD schema and canonical SEO architecture</li>
              <li>Framer Motion micro-interactions with reduced-motion support</li>
              <li>Conversion-focused layouts and contact flows</li>
            </ul>
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading label="FAQ" title="Web Design Questions" />
            <div className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <GlassCard key={faq.q}>
                  <h3 className="font-medium text-text">{faq.q}</h3>
                  <p className="mt-2 text-muted">{faq.a}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-16">
            <Link
              href={siteConfig.primaryCtaHref}
              className="rounded-md bg-parlor-accent px-8 py-3 font-display text-xl tracking-wider text-text transition-colors hover:bg-parlor-accent/80"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link href="/services/web-development" className="text-tech hover:underline">
              Web development services →
            </Link>
            <Link href="/work" className="text-muted hover:text-tech">
              View portfolio →
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
