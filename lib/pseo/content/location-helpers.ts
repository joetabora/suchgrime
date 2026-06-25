import type { PseoFaq, PseoPage } from "../types"

export function enrichLocation(raw: LocationSeed): PseoPage {
  if (raw.state === "WI") {
    return enrichWisconsinLocation(raw)
  }

  const city = raw.title
  const cityLower = city.toLowerCase()
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    headline: `${city} Custom Software & Automation`,
    intro: raw.intro,
    body: `${raw.intro} We build custom business applications, workflow automation, and high-performance websites for ${city} operators — internal dashboards, customer portals, CRM wiring, and Next.js sites engineered for conversion and Core Web Vitals.`,
    features: raw.features ?? [
      `Custom software for ${city}`,
      "Workflow & AI automation",
      "Mobile-first Next.js builds",
      "Structured data & schema markup",
    ],
    faqs: defaultLocationFaqs(city),
    keywords: raw.keywords ?? [
      `${cityLower} custom software development`,
      `${cityLower} business automation`,
      `${cityLower} small business app development`,
      `${cityLower} web development`,
      `${cityLower} website design company`,
    ],
    tags: [raw.region, city],
    geo: raw.geo,
  }
}

function enrichWisconsinLocation(raw: LocationSeed): PseoPage {
  const city = raw.title
  const cityLower = city.toLowerCase()
  const isMilwaukee = raw.slug === "milwaukee"

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    headline: `${city}, WI Custom Software & Automation`,
    intro: raw.intro,
    body: `${raw.intro} Wisconsin businesses face a unique mix of manufacturing heritage, tight-knit local markets, and seasonal demand swings — we build custom software, automation systems, and high-performance websites that help ${city} operators capture leads year-round. From internal dashboards and customer portals to workflow automation and LocalBusiness schema, SuchGrime combines Milwaukee-rooted engineering with systems that scale without adding headcount.`,
    features: raw.features ?? [
      `Custom software for ${city}, WI`,
      "Business automation & AI workflows",
      "Wisconsin-focused content & schema",
      "Mobile-first Next.js builds",
    ],
    faqs: wisconsinLocationFaqs(city, isMilwaukee),
    keywords: raw.keywords ?? [
      `${cityLower} custom software development`,
      `custom business software ${cityLower} wi`,
      `${cityLower} business automation`,
      `small business app development ${cityLower}`,
      `${cityLower} wi web development`,
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
      q: `What custom software can you build for ${city} businesses?`,
      a: `Internal dashboards, customer portals, CRMs, scheduling systems, inventory tools, and workflow automation — engineered around how your ${city} team actually operates.`,
    },
    {
      q: `What makes SuchGrime different from other ${city} agencies?`,
      a: "We engineer custom business systems and automation — not template sites. Every project includes structured data, performance tuning, and systems built to scale as you grow.",
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

export const WISCONSIN_SUBREGIONS = [
  "Southeast Wisconsin",
  "Madison Metro",
  "Fox Valley",
  "Western Wisconsin",
  "Northern Wisconsin",
] as const
