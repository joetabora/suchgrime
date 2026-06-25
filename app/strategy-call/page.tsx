import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"
import { SectionHeading } from "@/components/marketing/section-heading"
import { BookingFlow } from "@/components/scheduler/booking-flow"
import { buildMetadata } from "@/lib/seo/metadata"
import { strategyCallSchema } from "@/lib/seo/schemas/booking"
import { getBookableDays } from "@/lib/scheduler/availability"
import { siteConfig } from "@/lib/site-config"

const path = "/strategy-call"

export const metadata = buildMetadata({
  title: "Book A Strategy Call — Custom Software & Automation",
  description:
    "Schedule a 30-minute strategy call with SuchGrime. We'll map your workflows, identify bottlenecks, and outline what custom software, AI automation, or business systems could look like for your company.",
  path,
  keywords: [
    "book strategy call",
    "custom software consultation",
    "business automation wisconsin",
    "milwaukee software development",
    siteConfig.name,
  ],
})

export default function StrategyCallPage() {
  const bookableDays = getBookableDays()

  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen pt-[57px]">
        <ParlorNavbar />
        <main id="main" className="mx-auto max-w-[1400px] border-x border-white/10 px-6 py-16 md:px-12">
          <JsonLd data={strategyCallSchema()} />
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Strategy Call", path },
            ]}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                label="Schedule"
                title={siteConfig.primaryCta}
                description="Pick a time that works for you. We'll discuss your workflows, manual bottlenecks, and what custom software or automation could look like — no obligation, no sales pitch."
              />
              <ul className="mt-8 space-y-3 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-tech">→</span>
                  30-minute video or phone call
                </li>
                <li className="flex gap-2">
                  <span className="text-tech">→</span>
                  Workflow discovery and pain-point mapping
                </li>
                <li className="flex gap-2">
                  <span className="text-tech">→</span>
                  Honest scope and timeline guidance
                </li>
                <li className="flex gap-2">
                  <span className="text-tech">→</span>
                  Built in Wisconsin · Serving nationwide
                </li>
              </ul>
              <p className="mt-8 text-sm text-muted">
                Prefer email?{" "}
                <a href="/contact" className="text-tech hover:underline">
                  Send us a message instead
                </a>
                .
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-tech/5 via-transparent to-violet/5 blur-2xl" aria-hidden="true" />
              <div className="relative">
                <BookingFlow bookableDays={bookableDays} />
              </div>
            </div>
          </div>
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
