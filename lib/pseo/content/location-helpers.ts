import type { PseoFaq, PseoPage } from "../types"

export interface LocationSeed {
  slug: string
  title: string
  description: string
  intro: string
  region: string
  state?: string
  features?: string[]
  keywords?: string[]
  geo?: { latitude: number; longitude: number }
}

export function enrichLocation(raw: LocationSeed): PseoPage {
  if (raw.state === "WI") {
    return enrichWisconsinLocation(raw)
  }

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
    geo: raw.geo,
  }
}

function enrichWisconsinLocation(raw: LocationSeed): PseoPage {
  const city = raw.title
  const isMilwaukee = raw.slug === "milwaukee"

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    headline: `${city}, WI Web Development & Automation`,
    intro: raw.intro,
    body: `${raw.intro} Wisconsin businesses face a unique mix of manufacturing heritage, tight-knit local markets, and seasonal demand swings — we build Next.js sites and automation systems that help ${city} operators capture leads year-round. From LocalBusiness schema and city-specific landing pages to booking flows and CRM wiring, SuchGrime combines Milwaukee-rooted agency craft with engineering discipline. Whether you're a ${raw.region} service business, retailer, or B2B operator, we ship pages built to rank for "${city.toLowerCase()} + service" searches and convert traffic into booked work.`,
    features: raw.features ?? [
      `Local SEO for ${city}, WI`,
      "Wisconsin-focused content & schema",
      "Booking & workflow automation",
      "Mobile-first Next.js builds",
    ],
    faqs: wisconsinLocationFaqs(city, isMilwaukee),
    keywords: raw.keywords ?? [
      `${city.toLowerCase()} wi web development`,
      `web development agency ${city.toLowerCase()} wi`,
      `${city.toLowerCase()} business automation`,
      `${city.toLowerCase()} website design wisconsin`,
    ],
    tags: ["Wisconsin", raw.region, city],
    geo: raw.geo,
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

function wisconsinLocationFaqs(city: string, isMilwaukee: boolean): PseoFaq[] {
  const base = defaultLocationFaqs(city)
  return [
    ...base,
    {
      q: `Do you serve businesses across Wisconsin from ${city}?`,
      a: `Yes. We're headquartered in Milwaukee and partner with businesses throughout Wisconsin — including ${city} and the surrounding ${city === "Milwaukee" ? "Southeast Wisconsin" : "regional"} market. Remote collaboration is our default; Milwaukee-area clients can meet in person when helpful.`,
    },
    ...(isMilwaukee
      ? [
          {
            q: "Can we meet in person in Milwaukee?",
            a: "Absolutely. SuchGrime is based in Milwaukee — we're happy to meet locally for discovery sessions, reviews, and launch planning.",
          },
        ]
      : []),
  ]
}

export const WISCONSIN_SUBREGIONS = [
  "Southeast Wisconsin",
  "Madison Metro",
  "Fox Valley",
  "Western Wisconsin",
  "Northern Wisconsin",
] as const
