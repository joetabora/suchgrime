import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.aboutJoe.name,
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    description: siteConfig.aboutJoe.pullQuote,
    image: `${getSiteUrl()}${siteConfig.aboutJoe.image}`,
    url: `${getSiteUrl()}/about`,
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/opengraph-image`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: siteConfig.aboutJoe.name,
      jobTitle: "Founder",
      image: `${getSiteUrl()}${siteConfig.aboutJoe.image}`,
    },
    sameAs: siteConfig.sameAs,
    areaServed: { "@type": "State", name: "Wisconsin" },
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function localBusinessSchema() {
  const { address, geo, priceRange } = siteConfig.localBusiness
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange,
    founder: {
      "@type": "Person",
      name: siteConfig.aboutJoe.name,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    areaServed: [
      { "@type": "State", name: "Wisconsin" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: siteConfig.sameAs,
  }
}
