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

const path = "/ai-automation"

const capabilities = [
  "Lead Routing",
  "Automated Follow-Up",
  "CRM Automation",
  "AI Assistants",
  "Workflow Automation",
  "Data Synchronization",
  "Reporting Automation",
  "Notification Pipelines",
]

const faqs = [
  {
    q: "What can AI automation do for my business?",
    a: "AI automation can route leads to the right person, trigger follow-up sequences, answer common customer questions, sync data between tools, generate reports, and eliminate repetitive manual tasks — freeing your team to focus on growth.",
  },
  {
    q: "Do I need to replace my existing tools?",
    a: "No. We connect automation to your existing CRM, calendar, email, and SaaS platforms via APIs and webhooks. New automation layers on top of what you already use.",
  },
  {
    q: "What's the difference between Zapier automation and custom automation?",
    a: "Zapier and Make are great for simple triggers. Custom automation handles complex logic, large data volumes, AI-powered decisions, and integrations that off-the-shelf platforms can't support.",
  },
  {
    q: "How do you approach AI assistants?",
    a: "We build AI assistants tailored to your business context — trained on your processes, connected to your data, and designed for specific use cases like lead qualification, customer support, or internal knowledge retrieval.",
  },
]

export const metadata = buildMetadata({
  title: "AI Automation Services for Small Business — Wisconsin",
  description:
    "AI assistants, lead routing, CRM automation, workflow automation, data synchronization, and reporting automation for Wisconsin businesses. Eliminate manual work and connect your tools.",
  path,
  keywords: [
    "business automation milwaukee",
    "business automation wisconsin",
    "AI automation services",
    "business process automation",
    "workflow automation",
    "CRM automation",
    "custom workflow software",
    "milwaukee business automation",
    siteConfig.name,
  ],
})

export default function AiAutomationPage() {
  const service = serviceSchema({
    name: "AI & Business Automation",
    description:
      "Lead routing, automated follow-up, CRM automation, AI assistants, workflow automation, data synchronization, and reporting automation.",
    path,
    serviceType: "AI Automation Services",
  })

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={[service, faqSchema(faqs)]} />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "AI Automation", path }]} />

          <SectionHeading
            label="AI & Automation"
            title="Workflows That Run While You Sleep"
            description="Lead routing, automated follow-up, CRM wiring, AI assistants, and data pipelines that eliminate manual work and connect your tools into one intelligent system."
            className="mt-8"
          />

          <div className="mt-12 space-y-8">
            {siteConfig.automationExamples.map((example) => (
              <GlassCard key={example.title}>
                <h3 className="font-display text-xl tracking-wide">{example.title}</h3>
                <p className="mt-2 text-sm text-muted">{example.description}</p>
                <div className="mt-4">
                  <WorkflowDiagram nodes={example.nodes} />
                </div>
              </GlassCard>
            ))}
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
              title="Business Automation Across Wisconsin"
              description="We build AI automation and workflow systems for operators in Milwaukee, Madison, Green Bay, and markets statewide."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wisconsinHubLinks.map((city) => (
                <li key={city.href}>
                  <Link href={`${city.href}/ai-automation`} className="group block">
                    <GlassCard hover>
                      <span className="font-medium group-hover:text-tech">{city.label}</span>
                      <span className="mt-1 block text-sm text-muted">Business automation →</span>
                    </GlassCard>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading label="FAQ" title="AI & Automation Questions" />
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
            <Link href="/wisconsin" className="text-tech hover:underline">
              Wisconsin markets →
            </Link>
            <Link href="/custom-software" className="text-muted hover:text-tech">
              Custom Software →
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
