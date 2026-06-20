import { SiteLayout } from "../layouts/SiteLayout"
import { DemoBanner } from "../components/DemoBanner"
import { Navbar } from "../components/deadset-ink/Navbar"
import { Hero } from "../components/deadset-ink/Hero"
import { Gallery } from "../components/deadset-ink/Gallery"
import { About } from "../components/deadset-ink/About"
import { Team } from "../components/deadset-ink/Team"
import { Services } from "../components/deadset-ink/Services"
import { VisitContact } from "../components/deadset-ink/VisitContact"
import { Footer } from "../components/deadset-ink/Footer"

export function DeadsetInkPage() {
  return (
    <SiteLayout>
      <div className="deadset-ink">
        <DemoBanner />
        <Navbar />
        <main id="main">
          <Hero />
          <Gallery />
          <About />
          <Team />
          <Services />
          <VisitContact />
        </main>
        <Footer />
      </div>
    </SiteLayout>
  )
}
