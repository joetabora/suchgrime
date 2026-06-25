import { SiteShell } from "@/components/layout/site-shell"
import { ParlorNavbar } from "@/components/agency/parlor-navbar"
import { ParlorFooter } from "@/components/agency/parlor-footer"
import { JsonLd } from "@/components/seo/json-ld"
import { HomeHero } from "@/components/marketing/home/home-hero"
import { HomeProcess } from "@/components/marketing/home/home-process"
import { HomeServices } from "@/components/marketing/home/home-services"
import { HomeSpreadsheet } from "@/components/marketing/home/home-spreadsheet"
import { HomeProjects } from "@/components/marketing/home/home-projects"
import { HomeAutomation } from "@/components/marketing/home/home-automation"
import { HomeWhyCustom } from "@/components/marketing/home/home-why-custom"
import { HomeWebsites } from "@/components/marketing/home/home-websites"
import { HomeFaq } from "@/components/marketing/home/home-faq"
import { HomeCta } from "@/components/marketing/home/home-cta"
import { buildMetadata } from "@/lib/seo/metadata"
import { faqSchema } from "@/lib/seo/schemas/faq"
import { siteConfig } from "@/lib/site-config"

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Custom Software, AI Automation & Business Systems in Wisconsin`,
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
          <HomeProcess />
          <HomeServices />
          <HomeSpreadsheet />
          <HomeProjects />
          <HomeAutomation />
          <HomeWhyCustom />
          <HomeWebsites />
          <HomeFaq />
          <HomeCta />
        </main>
        <ParlorFooter />
      </div>
    </SiteShell>
  )
}
