import { SiteLayout } from "../layouts/SiteLayout"
import { ParlorNavbar } from "../components/parlor/ParlorNavbar"
import { ParlorHero } from "../components/parlor/ParlorHero"
import { ParlorWork } from "../components/parlor/ParlorWork"
import { ParlorAbout } from "../components/parlor/ParlorAbout"
import { ParlorServices } from "../components/parlor/ParlorServices"
import { ParlorProcess } from "../components/parlor/ParlorProcess"
import { ParlorContact } from "../components/parlor/ParlorContact"
import { ParlorFooter } from "../components/parlor/ParlorFooter"

export function AgencyHomePage() {
  return (
    <SiteLayout>
      <div className="suchgrime-parlor min-h-screen">
        <ParlorNavbar />
        <main id="main">
          <ParlorHero />
          <ParlorWork />
          <ParlorAbout />
          <ParlorServices />
          <ParlorProcess />
          <ParlorContact />
        </main>
        <ParlorFooter />
      </div>
    </SiteLayout>
  )
}
