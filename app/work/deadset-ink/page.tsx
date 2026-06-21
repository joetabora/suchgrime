import { SiteShell } from "@/components/layout/site-shell"
import { DemoBanner } from "@/components/demo-banner"
import { Navbar } from "@/components/demos/deadset-ink/Navbar"
import { Hero } from "@/components/demos/deadset-ink/Hero"
import { Gallery } from "@/components/demos/deadset-ink/Gallery"
import { About } from "@/components/demos/deadset-ink/About"
import { Team } from "@/components/demos/deadset-ink/Team"
import { Services } from "@/components/demos/deadset-ink/Services"
import { VisitContact } from "@/components/demos/deadset-ink/VisitContact"
import { Footer } from "@/components/demos/deadset-ink/Footer"
import { buildMetadata } from "@/lib/seo/metadata"
import { webPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Deadset Ink Demo",
  description: "Live demo — editorial tattoo parlor site built by SuchGrime.",
  path: "/work/deadset-ink",
  noIndex: true,
})

export default function DeadsetInkPage() {
  return (
    <SiteShell>
      <div className="deadset-ink">
        <DemoBanner />
        <Navbar />
        <JsonLd
          data={webPageSchema("Deadset Ink", "Tattoo parlor marketing site demo.", "/work/deadset-ink")}
        />
        <main id="main" className="pt-9">
          <Hero />
          <Gallery />
          <About />
          <Team />
          <Services />
          <VisitContact />
        </main>
        <Footer />
      </div>
    </SiteShell>
  )
}
