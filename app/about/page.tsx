import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { buildMetadata } from "@/lib/seo/metadata"
import { webPageSchema } from "@/lib/seo/schemas/application"
import { siteConfig } from "@/lib/site-config"

const path = "/about"

export const metadata = buildMetadata({
  title: "About SuchGrime — Custom Software & Business Systems Studio",
  description:
    "Wisconsin-based studio building custom business applications, AI automation, internal dashboards, and high-performance websites for small businesses nationwide.",
  path,
  keywords: [
    "custom software development wisconsin",
    "milwaukee software development",
    "business systems agency",
    "small business software development",
    siteConfig.name,
  ],
})

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd
            data={webPageSchema(
              "About SuchGrime",
              siteConfig.about.story,
              path,
            )}
          />
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path }]} />

          <SectionHeading
            label="About"
            title="We Build The Systems That Run Businesses"
            description={siteConfig.about.story}
            className="mt-8"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.about.stats.map((stat) => (
              <GlassCard key={stat.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-tech">{stat.label}</p>
                <p className="mt-2 font-display text-2xl tracking-wide">{stat.value}</p>
              </GlassCard>
            ))}
          </div>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading label="What We Believe" title="Our Approach" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {siteConfig.about.values.map((value) => (
                <GlassCard key={value.title}>
                  <h3 className="font-display text-xl tracking-wide">{value.title}</h3>
                  <p className="mt-2 text-muted">{value.description}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading
              label="Who We Work With"
              title="Built For Operators, Not Procurement Departments"
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {siteConfig.about.whoWeWorkWith.map((item) => (
                <li
                  key={item}
                  className="glass glass-border rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 border-t border-white/10 pt-16">
            <SectionHeading label="Process" title="How We Work" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.process.map((step) => (
                <GlassCard key={step.step}>
                  <span className="font-mono text-sm text-tech">{step.step}</span>
                  <h3 className="mt-2 font-display text-xl tracking-wide">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
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
            <Link href="/work" className="text-tech hover:underline">
              {siteConfig.secondaryCta} →
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
