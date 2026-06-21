import type { PseoFaq, PseoPage } from "../types"

export function enrichIndustry(page: PseoPage): PseoPage {
  const industry = page.title
  return {
    ...page,
    headline: page.headline ?? `${industry} Web Development`,
    body:
      page.body ??
      `${page.intro} SuchGrime builds industry-specific websites and automation for ${industry.toLowerCase()} operators — with compliance-minded UX, conversion-focused architecture, and SEO patterns that match how your buyers search. From intake forms to CRM wiring, we reduce manual work while strengthening your digital presence.`,
    faqs: page.faqs?.length
      ? page.faqs
      : [
          {
            q: `What ${industry.toLowerCase()} website features do you build?`,
            a: `We tailor features to ${industry.toLowerCase()} workflows — booking, intake, service pages, trust modules, and automation that matches how your team operates.`,
          },
          {
            q: `Do you understand ${industry.toLowerCase()} compliance requirements?`,
            a: "We implement secure form patterns, accessibility standards, and UX conventions common in regulated industries — and recommend legal review for compliance-specific requirements.",
          },
          {
            q: `Can you integrate with our existing ${industry.toLowerCase()} tools?`,
            a: "Yes. We wire CRMs, scheduling platforms, payment processors, and custom APIs so your site and ops stay connected.",
          },
          {
            q: `How does SEO work for ${industry.toLowerCase()} businesses?`,
            a: "We build programmatic service and location pages, FAQ schema, and internal linking hubs so you capture long-tail searches across your service area.",
          },
        ],
  }
}
