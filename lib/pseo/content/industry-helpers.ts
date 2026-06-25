import type { PseoFaq, PseoPage } from "../types"

export function enrichIndustry(page: PseoPage): PseoPage {
  const industry = page.title
  const industryLower = industry.toLowerCase()
  return {
    ...page,
    headline: page.headline ?? `${industry} Custom Software & Automation`,
    body:
      page.body ??
      `${page.intro} SuchGrime builds custom business applications and automation for ${industryLower} operators — internal dashboards, customer portals, workflow systems, and high-performance websites with compliance-minded UX and conversion-focused architecture. From intake forms to CRM wiring, we reduce manual work while strengthening your digital presence.`,
    faqs: page.faqs?.length
      ? page.faqs
      : [
          {
            q: `What custom software do you build for ${industryLower} businesses?`,
            a: `We tailor internal dashboards, customer portals, scheduling systems, and automation to ${industryLower} workflows — booking, intake, service pages, trust modules, and operational tools your team actually uses.`,
          },
          {
            q: `Do you understand ${industryLower} compliance requirements?`,
            a: "We implement secure form patterns, accessibility standards, and UX conventions common in regulated industries — and recommend legal review for compliance-specific requirements.",
          },
          {
            q: `Can you integrate with our existing ${industryLower} tools?`,
            a: "Yes. We wire CRMs, scheduling platforms, payment processors, and custom APIs so your systems and operations stay connected.",
          },
          {
            q: `How does SEO work for ${industryLower} businesses?`,
            a: "We build programmatic service and location pages, FAQ schema, and internal linking hubs so you capture long-tail searches across your service area.",
          },
        ],
  }
}
