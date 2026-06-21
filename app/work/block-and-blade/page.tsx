import { SiteShell } from "@/components/layout/site-shell"
import { DemoBanner } from "@/components/demo-banner"
import { Navbar } from "@/components/demos/block-and-blade/Navbar"
import { Hero } from "@/components/demos/block-and-blade/Hero"
import { Marquee } from "@/components/demos/block-and-blade/Marquee"
import { About } from "@/components/demos/block-and-blade/About"
import { Services } from "@/components/demos/block-and-blade/Services"
import { Team } from "@/components/demos/block-and-blade/Team"
import { Gallery } from "@/components/demos/block-and-blade/Gallery"
import { Location } from "@/components/demos/block-and-blade/Location"
import { Contact } from "@/components/demos/block-and-blade/Contact"
import { Footer } from "@/components/demos/block-and-blade/Footer"
import { buildMetadata } from "@/lib/seo/metadata"
import { webPageSchema } from "@/lib/seo/schemas/application"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata = buildMetadata({
  title: "Block & Blade Barbershop Demo",
  description: "Live demo — urban barbershop marketing site built by SuchGrime.",
  path: "/work/block-and-blade",
  noIndex: true,
})

export default function BlockAndBladePage() {
  return (
    <SiteShell>
      <DemoBanner />
      <Navbar />
      <JsonLd
        data={webPageSchema(
          "Block & Blade Barbershop",
          "Urban barbershop marketing site demo.",
          "/work/block-and-blade",
        )}
      />
      <main id="main" className="pt-9">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  )
}
