import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function strategyCallSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Strategy Call",
    description:
      "Book a 30-minute strategy call with SuchGrime to discuss custom software, automation, and business systems for your company.",
    url: `${getSiteUrl()}/strategy-call`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${getSiteUrl()}/strategy-call`,
    },
    areaServed: [
      { "@type": "State", name: "Wisconsin" },
      { "@type": "Country", name: "United States" },
    ],
  }
}
