import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { JsonLd } from "@/components/seo/json-ld"
import { HomeHero } from "@/components/marketing/home/home-hero"
import { HomePain } from "@/components/marketing/home/home-pain"
import { HomeSpreadsheet } from "@/components/marketing/home/home-spreadsheet"
import { HomeSolutions } from "@/components/marketing/home/home-solutions"
import { HomeAutomation } from "@/components/marketing/home/home-automation"
import { HomeAboutJoe } from "@/components/marketing/home/home-about-joe"
import { HomeProjects } from "@/components/marketing/home/home-projects"
import { HomeWebsites } from "@/components/marketing/home/home-websites"
import { HomeWhyCustom } from "@/components/marketing/home/home-why-custom"
import { HomeProcess } from "@/components/marketing/home/home-process"
import { HomeFaq } from "@/components/marketing/home/home-faq"
import { HomeCta } from "@/components/marketing/home/home-cta"
import { buildMetadata } from "@/lib/seo/metadata"
import { faqSchema } from "@/lib/seo/schemas/faq"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Blue-Collar Business Technology in Wisconsin`,
  description:
    "Custom business applications, AI automation, internal dashboards, customer portals, and high-performance websites for Wisconsin businesses. Stop forcing your business to fit someone else's software.",
  path: "/",
  keywords: [
    "custom business software wisconsin",
    "custom software development wisconsin",
    "small business app development",
    "business automation milwaukee",
    "business automation wisconsin",
    "custom business applications",
    "AI automation services",
    "client portal development",
    "internal dashboard development",
    "milwaukee software development",
    "small business software development",
    "custom CRM development",
    "business process automation",
    "workflow automation",
    "milwaukee web design",
    "wisconsin web development",
    siteConfig.name,
  ],
})

export default function HomePage() {
  return (
    <SiteShell>
      <div className="suchgrime-parlor min-h-screen">
        <ParlorNavbar />
        <JsonLd data={faqSchema(siteConfig.homeFaqs)} />
        <main id="main">
          <HomeHero />
          <HomePain />
          <HomeSpreadsheet />
          <HomeSolutions />
          <HomeAutomation />
          <HomeAboutJoe />
          <HomeProjects />
          <HomeWebsites />
          <HomeWhyCustom />
          <HomeProcess />
          <HomeFaq />
          <HomeCta />
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
