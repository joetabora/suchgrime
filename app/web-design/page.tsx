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
    a: "Both. Websites are often the front door — the entry point that leads to custom dashboards, customer portals, and automation as your operations grow. Every web project is engineered with performance, SEO, and long-term scalability in mind.",
  },
  {
    q: "What makes your websites different from template agencies?",
    a: "We use Next.js, TypeScript, and custom engineering — not WordPress themes or page builders. You get Core Web Vitals optimization, structured data, accessibility, and a codebase your team can extend into custom software.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. We handle full redesigns with content migration, SEO preservation, and performance improvements — often pairing a new site with automation or custom tools your team needs.",
  },
  {
    q: "When should we move from a website to custom software?",
    a: "When spreadsheets, manual data entry, or disconnected tools slow your team down. Many clients start with a website and escalate to custom applications or automation once lead volume and operations demand it.",
  },
]

export const metadata = buildMetadata({
  title: "Business Websites & Web Design — The Front Door to Your Systems",
  description:
    "High-performance business websites and landing pages built with Next.js — your entry point to custom software, automation, and internal tools. Milwaukee and Wisconsin web development with engineering discipline.",
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
            label="Your Front Door Online"
            title="Websites That Open the Door to Custom Systems"
            description="A high-performance website is often where the relationship starts — but many Wisconsin businesses quickly need custom dashboards, customer portals, and automation behind that front door. We build both."
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
              label="Beyond the Website"
              title="Ready to Scale Past a Marketing Site?"
              description="When operations outgrow spreadsheets and manual workflows, we build the systems behind your website — custom software and automation engineered with the same Next.js stack."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/custom-software" className="group block">
                <GlassCard hover className="h-full">
                  <h3 className="font-display text-xl tracking-wide group-hover:text-tech">Custom Software</h3>
                  <p className="mt-2 text-sm text-muted">
                    Internal dashboards, customer portals, CRMs, and operational tools built for how you work.
                  </p>
                </GlassCard>
              </Link>
              <Link href="/ai-automation" className="group block">
                <GlassCard hover className="h-full">
                  <h3 className="font-display text-xl tracking-wide group-hover:text-tech">AI & Automation</h3>
                  <p className="mt-2 text-sm text-muted">
                    Lead routing, CRM wiring, workflow automation, and AI assistants that eliminate manual work.
                  </p>
                </GlassCard>
              </Link>
            </div>
          </section>

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
            <Link href="/custom-software" className="text-tech hover:underline">
              Custom software →
            </Link>
            <Link href="/ai-automation" className="text-tech hover:underline">
              AI & automation →
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
