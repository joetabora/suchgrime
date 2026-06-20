import { SiteLayout } from "../layouts/SiteLayout"
import { DemoBanner } from "../components/DemoBanner"
import { Navbar } from "../components/block-and-blade/Navbar"
import { Hero } from "../components/block-and-blade/Hero"
import { Marquee } from "../components/block-and-blade/Marquee"
import { About } from "../components/block-and-blade/About"
import { Services } from "../components/block-and-blade/Services"
import { Team } from "../components/block-and-blade/Team"
import { Gallery } from "../components/block-and-blade/Gallery"
import { Location } from "../components/block-and-blade/Location"
import { Contact } from "../components/block-and-blade/Contact"
import { Footer } from "../components/block-and-blade/Footer"

export function BlockAndBladePage() {
  return (
    <SiteLayout>
      <DemoBanner />
      <Navbar />
      <main id="main">
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
    </SiteLayout>
  )
}
