import { getSiteUrl } from "@/lib/utils"
import type { ServicePage } from "@/lib/site-config"

export function serviceSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "SuchGrime",
      url: getSiteUrl(),
    },
    url: `${getSiteUrl()}/services/${service.slug}`,
    areaServed: { "@type": "Country", name: "United States" },
  }
}

export function serviceFaqSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }
}
