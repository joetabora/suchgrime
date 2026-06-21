import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorHero } from "@/components/agency/parlor-hero"
import { ParlorWork } from "@/components/agency/parlor-work"
import { ParlorAbout } from "@/components/agency/parlor-about"
import { ParlorServices } from "@/components/agency/parlor-services"
import { ParlorProcess } from "@/components/agency/parlor-process"
import { ParlorContact } from "@/components/agency/parlor-contact"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { JsonLd } from "@/components/seo/json-ld"
import { localBusinessSchema } from "@/lib/seo/schemas/organization"

export default function HomePage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen">
        <JsonLd data={localBusinessSchema()} />
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
    </SiteShell>
  )
}
