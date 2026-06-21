import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/favicon.svg`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: [],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    publisher: { "@type": "Organization", name: siteConfig.name },
  }
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    email: siteConfig.contact.email,
    priceRange: siteConfig.localBusiness.priceRange,
    areaServed: { "@type": "Country", name: "United States" },
  }
}
