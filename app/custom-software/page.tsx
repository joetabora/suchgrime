import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { WorkflowDiagram } from "@/components/marketing/workflow-diagram"
import { buildMetadata } from "@/lib/seo/metadata"
import { faqSchema, serviceSchema } from "@/lib/seo/schemas/faq"
import { wisconsinHubLinks } from "@/lib/seo/site-links"
import { siteConfig } from "@/lib/site-config"

const path = "/custom-software"

const capabilities = [
  "Internal Dashboards",
  "Customer Portals",
  "Employee Tools",
  "Scheduling Systems",
  "Inventory Management",
  "CRM Solutions",
  "Lead Tracking Platforms",
  "Event Management Platforms",
]

const faqs = [
  {
    q: "What is custom business software?",
    a: "Custom business software is built specifically for your workflows, data, and team — unlike off-the-shelf tools that force you to adapt. It includes internal dashboards, customer portals, CRMs, scheduling systems, and any tool your business needs to operate efficiently.",
  },
  {
    q: "How long does a custom application take to build?",
    a: "Timeline depends on scope. A focused internal dashboard might take 4–8 weeks. Larger systems with multiple integrations can take 3–6 months. We scope projects clearly during the strategy call so you know what to expect.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes. We connect custom software with your existing SaaS platforms, databases, and APIs — so new systems work alongside what you already use rather than replacing everything at once.",
  },
  {
    q: "Do you work with businesses outside Wisconsin?",
    a: "Absolutely. We're based in Wisconsin but serve clients nationwide. Most of our work is done remotely with regular check-ins and demos.",
  },
]

export const metadata = buildMetadata({
  title: "Custom Software Development for Small Business — Wisconsin",
  description:
    "Custom business applications, internal dashboards, customer portals, CRMs, and scheduling systems built for how your business actually works. Wisconsin-based, serving nationwide.",
  path,
  keywords: [
    "custom business software wisconsin",
    "small business app development",
    "custom software development wisconsin",
    "custom business applications",
    "internal dashboard development",
    "client portal development",
    "custom CRM development",
    "milwaukee software development",
    siteConfig.name,
  ],
})

export default function CustomSoftwarePage() {
  const service = serviceSchema({
    name: "Custom Business Applications",
    description:
      "Internal dashboards, customer portals, employee tools, scheduling systems, inventory management, CRMs, and lead tracking platforms built for your business.",
    path,
    serviceType: "Custom Software Development",
  })

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={[service, faqSchema(faqs)]} />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Custom Software", path }]} />

          <SectionHeading
            label="Custom Business Applications"
            title="Software Built Around How You Actually Work"
            description="Stop adapting to tools that weren't designed for you. We engineer internal dashboards, customer portals, CRMs, and operational systems that fit your business from day one."
            className="mt-8"
          />

          <div className="mt-12">
            <WorkflowDiagram
              nodes={[
                { label: "Your Workflow", variant: "muted" },
                { label: "Custom System", variant: "accent" },
                { label: "Your Team", variant: "default" },
              ]}
            />
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <GlassCard key={cap}>
                <p className="font-display text-lg tracking-wide">{cap}</p>
              </GlassCard>
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading
              label="Wisconsin Markets"
              title="Custom Software Across Wisconsin"
              description="We build custom business applications for operators in Milwaukee, Madison, Green Bay, and markets statewide."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wisconsinHubLinks.map((city) => (
                <li key={city.href}>
                  <Link href={`${city.href}/custom-software`} className="group block">
                    <GlassCard hover>
                      <span className="font-medium group-hover:text-tech">{city.label}</span>
                      <span className="mt-1 block text-sm text-muted">Custom software →</span>
                    </GlassCard>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading
              label="Who It's For"
              title="Businesses That Have Outgrown Generic Software"
              description="Contractors, service businesses, dealerships, restaurants, event companies, manufacturers, and local retailers — anyone running critical operations on spreadsheets and manual processes."
            />
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading label="FAQ" title="Custom Software Questions" />
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
            <Link href="/case-studies" className="text-tech hover:underline">
              View case studies →
            </Link>
            <Link href="/ai-automation" className="text-muted hover:text-tech">
              AI & Automation →
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
