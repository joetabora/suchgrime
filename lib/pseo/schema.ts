import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import type { PseoCollectionConfig, PseoPage } from "./types"

export function buildPseoJsonLd(
  page: PseoPage,
  collection: PseoCollectionConfig,
  canonicalPath: string,
) {
  const url = `${getSiteUrl()}${canonicalPath}`

  const base = {
    "@context": "https://schema.org",
    url,
    name: page.title,
    description: page.description,
  }

  if (page.isMatrix) {
    const areaName =
      page.parentSlug && collection.id === "locations"
        ? page.title.split(" in ").pop() ?? page.title
        : page.title.split(" in ").pop() ?? page.title

    return {
      ...base,
      "@type": "Service",
      serviceType: page.title,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: getSiteUrl(),
      },
      areaServed: {
        "@type": collection.id === "locations" ? "City" : "AdministrativeArea",
        name: areaName,
      },
    }
  }

  switch (collection.schemaType) {
    case "Service":
      return {
        ...base,
        "@type": "Service",
        provider: { "@type": "Organization", name: siteConfig.name, url: getSiteUrl() },
        areaServed: { "@type": "Country", name: "United States" },
      }
    case "SoftwareApplication":
      return {
        ...base,
        "@type": "SoftwareApplication",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: siteConfig.name },
      }
    case "CreativeWork":
      return {
        ...base,
        "@type": "CreativeWork",
        creator: { "@type": "Organization", name: siteConfig.name },
        ...(page.image && { image: page.image }),
      }
    case "Article":
      return {
        ...base,
        "@type": "Article",
        headline: page.title,
        datePublished: page.date,
        author: { "@type": "Organization", name: siteConfig.name },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: { "@type": "ImageObject", url: `${getSiteUrl()}/opengraph-image` },
        },
      }
    case "LocalBusiness":
      return {
        ...base,
        "@type": "LocalBusiness",
        areaServed: page.tags?.includes("Wisconsin")
          ? { "@type": "City", name: `${page.title}, WI` }
          : page.title,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: page.title,
          addressRegion: page.tags?.includes("Wisconsin") ? "WI" : undefined,
          addressCountry: "US",
        },
        ...(page.geo && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: page.geo.latitude,
            longitude: page.geo.longitude,
          },
        }),
      }
    default:
      return { ...base, "@type": "WebPage" }
  }
}

export function buildPseoFaqSchema(page: PseoPage) {
  if (!page.faqs?.length) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }
}
