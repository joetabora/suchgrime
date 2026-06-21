import type { PseoFaq, PseoPage } from "../types"

export interface LocationSeed {
  slug: string
  title: string
  description: string
  intro: string
  region: string
  features?: string[]
  keywords?: string[]
  geo?: { latitude: number; longitude: number }
}

export function enrichLocation(raw: LocationSeed): PseoPage {
  const city = raw.title
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    headline: `${city} Web Development & Automation`,
    intro: raw.intro,
    body: `${raw.intro} We combine local market positioning with Next.js performance, structured SEO, and workflow automation so ${city} operators can compete on speed and visibility — not just aesthetics. Whether you need a marketing site, booking flow, or internal dashboard, SuchGrime ships production-ready builds tuned for Core Web Vitals and conversion.`,
    features: raw.features ?? [
      `Local SEO for ${city}`,
      "Mobile-first Next.js builds",
      "Booking & workflow automation",
      "Structured data & schema markup",
    ],
    faqs: defaultLocationFaqs(city),
    keywords: raw.keywords ?? [
      `${city} web development`,
      `${city} web agency`,
      `${city} business automation`,
      `${city} website design company`,
    ],
    tags: [raw.region, city],
  }
}

function defaultLocationFaqs(city: string): PseoFaq[] {
  return [
    {
      q: `Do you work with ${city} businesses remotely?`,
      a: `Yes. We partner with ${city} businesses nationwide and tailor every build to your market, service area, and operations — without requiring in-person meetings.`,
    },
    {
      q: `How long does a typical ${city} website project take?`,
      a: "Most marketing sites launch in 4–8 weeks depending on scope. Automation and booking integrations may extend timelines — we scope clearly upfront.",
    },
    {
      q: `What makes SuchGrime different from other ${city} web agencies?`,
      a: "We ship on Next.js with SEO and automation built in from day one — not bolted on after launch. Every project includes structured data, performance tuning, and CMS-ready architecture.",
    },
    {
      q: `Can you help with local SEO in ${city}?`,
      a: `Absolutely. We build location-aware pages, LocalBusiness schema, and internal linking structures that help ${city} businesses rank for service + city queries.`,
    },
  ]
}
