import Link from "next/link"
import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { GlassCard } from "@/components/marketing/glass-card"
import { PortraitImage } from "@/components/marketing/portrait-image"
import { Stamp } from "@/components/marketing/stamp"
import { buildMetadata } from "@/lib/seo/metadata"
import { webPageSchema } from "@/lib/seo/schemas/application"
import { founderSchema, organizationSchema } from "@/lib/seo/schemas/organization"
import { siteConfig } from "@/lib/site-config"

const path = "/about"

export const metadata = buildMetadata({
  title: "About SuchGrime — Blue-Collar Business Technology",
  description:
    "Wisconsin-based studio founded by Joe — an operator who builds custom business applications, AI automation, and systems for contractors, trades, dealerships, and service businesses.",
  path,
  keywords: [
    "custom software development wisconsin",
    "milwaukee software development",
    "small business software development",
    "business automation wisconsin",
    siteConfig.name,
  ],
})

export default function AboutPage() {
  const bioParagraphs = siteConfig.aboutJoe.bio.split("\n\n").filter(Boolean)

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
          <JsonLd
            data={[
              webPageSchema("About SuchGrime", siteConfig.about.story, path),
              organizationSchema(),
              founderSchema(),
            ]}
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
              <GlassCard key={stat.label} variant="pressed">
                <p className="text-label text-purple">{stat.label}</p>
                <p className="mt-2 display-heading text-2xl text-text">{stat.value}</p>
              </GlassCard>
            ))}
          </div>

          <section className="mt-20 border-t border-white/8 pt-16 paper-grain">
            <SectionHeading label="Founder" title={siteConfig.aboutJoe.headline} />
            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-16">
              <PortraitImage className="max-w-sm" />
              <div>
                <GlassCard variant="pressed" className="mb-8 border-l-2 border-l-purple">
                  <p className="font-quote text-xl leading-snug text-text md:text-2xl">
                    &ldquo;{siteConfig.aboutJoe.pullQuote}&rdquo;
                  </p>
                </GlassCard>
                <div className="space-y-4 leading-relaxed text-muted">
                  {bioParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {siteConfig.aboutJoe.backgroundAreas.map((area) => (
                    <li key={area}>
                      <Stamp>{area}</Stamp>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-20 border-t border-white/8 pt-16">
            <SectionHeading label="What We Believe" title="Our Approach" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {siteConfig.about.values.map((value) => (
                <GlassCard key={value.title} variant="pressed">
                  <h3 className="display-heading text-xl text-text">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{value.description}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-white/8 pt-16">
            <SectionHeading
              label="Who We Work With"
              title="Built For Operators, Not Procurement Departments"
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {siteConfig.about.whoWeWorkWith.map((item) => (
                <li key={item}>
                  <Stamp>{item}</Stamp>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 border-t border-white/8 pt-16">
            <SectionHeading label="Process" title="How We Work" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {siteConfig.process.map((step) => (
                <GlassCard key={step.step} variant="pressed">
                  <span className="text-label text-purple">{step.step}</span>
                  <h3 className="mt-2 display-heading text-xl text-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-white/8 pt-16">
            <Link
              href={siteConfig.primaryCtaHref}
              className="rounded-sm bg-parlor-accent px-8 py-3 text-base font-semibold text-text transition-colors hover:bg-parlor-accent/85"
            >
              {siteConfig.primaryCta}
            </Link>
            <Link href="/case-studies" className="text-purple hover:underline">
              View case studies →
            </Link>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
