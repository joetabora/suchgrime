import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorHero } from "@/components/agency/parlor-hero"
import { ParlorWork } from "@/components/agency/parlor-work"
import { ParlorAbout } from "@/components/agency/parlor-about"
import { ParlorServices } from "@/components/agency/parlor-services"
import { ParlorProcess } from "@/components/agency/parlor-process"
import { ParlorContact } from "@/components/agency/parlor-contact"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { buildMetadata } from "@/lib/seo/metadata"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Web Development & Automation in Wisconsin`,
  description:
    "Milwaukee-based web development and business automation agency serving Wisconsin — custom Next.js sites, booking systems, and workflow automation for brands that move fast.",
  path: "/",
  keywords: [
    "web development agency milwaukee",
    "wisconsin business automation",
    "milwaukee web design",
    "Next.js development wisconsin",
    "web development agency",
    siteConfig.name,
  ],
})

export default function HomePage() {
  return (
    <SiteShell>
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
    </SiteShell>
  )
}
