import { getSiteUrl } from "@/lib/utils"

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Parlor Desk",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    description:
      "Internal booking admin for service businesses — appointment CRUD, client tracking, status workflow, and dashboard stats.",
    url: `${getSiteUrl()}/work/parlor-desk`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "SuchGrime",
      url: getSiteUrl(),
    },
  }
}

export function collectionPageSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${getSiteUrl()}${path}`,
  }
}

export function webPageSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${getSiteUrl()}${path}`,
  }
}
