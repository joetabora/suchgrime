import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export interface FaqItem {
  q: string
  a: string
}

export function faqSchema(items: readonly FaqItem[] | FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string
  description: string
  path: string
  serviceType?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${getSiteUrl()}${path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    areaServed: [
      { "@type": "State", name: "Wisconsin" },
      { "@type": "Country", name: "United States" },
    ],
    ...(serviceType && { serviceType }),
  }
}
