import type { PseoCollectionId, PseoPage } from "./types"
import { getAllPagesForCollection } from "./registry"

function isWisconsinLocation(parent: PseoPage): boolean {
  return parent.tags?.includes("Wisconsin") ?? false
}

/**
 * Generates programmatic combination pages: parent entity × service.
 * Scales to thousands by adding rows to content files — no new route code needed.
 */
export function buildMatrixPages(
  parentCollection: PseoCollectionId,
  parents: PseoPage[],
  serviceList: PseoPage[],
): PseoPage[] {
  const matrix: PseoPage[] = []

  for (const parent of parents) {
    if (parent.isMatrix) continue

    const isWi = parentCollection === "locations" && isWisconsinLocation(parent)

    for (const service of serviceList) {
      if (service.isMatrix) continue

      const parentLabelText = parent.title
      const serviceLabel = service.title
      const serviceLower = serviceLabel.toLowerCase()
      const wiSuffix = isWi ? ", WI" : ""

      const wiBodyExtra = isWi
        ? ` Wisconsin's mix of manufacturing, healthcare, tourism, and tight-knit local markets means ${parentLabelText} businesses need sites that rank year-round — not just in peak season. SuchGrime is Milwaukee-based and serves operators statewide with ${serviceLower} built for Midwest buyers who search by city and service.`
        : ""

      const baseFaqs = [
        {
          q: `Do you work with ${parentLabelText} businesses remotely?`,
          a: `Yes. We partner with ${parentLabelText} businesses nationwide and tailor ${serviceLower} deliverables to your market, service area, and internal workflows.`,
        },
        {
          q: `What's included in ${serviceLower} for ${parentLabelText}?`,
          a: `${service.intro.slice(0, 220)}${service.intro.length > 220 ? "…" : ""} Every engagement includes SEO-ready architecture and launch support.`,
        },
        {
          q: `How long does ${serviceLower} take for a ${parentLabelText} business?`,
          a: "Timelines vary by scope — marketing sites typically launch in 4–8 weeks. Automation and booking integrations are scoped separately with clear milestones.",
        },
        {
          q: `Can you help us rank for ${parentLabelText} ${serviceLower} searches?`,
          a: `Yes. We build location- and service-aware pages, FAQ schema, internal links, and technical SEO foundations targeting ${parentLabelText}${wiSuffix} + ${serviceLower} keyword combinations.`,
        },
        {
          q: `Do you integrate with tools our ${parentLabelText} team already uses?`,
          a: "We wire CRMs, scheduling platforms, payment processors, email tools, and custom APIs so your site and operations stay connected after launch.",
        },
        {
          q: `Why choose SuchGrime over a local ${parentLabelText} agency?`,
          a: "We engineer custom business systems, automation, and high-performance web platforms — not template sites. You get systems-thinking with engineering discipline, built to scale as your business grows.",
        },
      ]

      const wiFaqs = isWi
        ? [
            {
              q: `Do you serve ${parentLabelText} and other Wisconsin markets?`,
              a: `Yes. SuchGrime is headquartered in Milwaukee and partners with businesses across Wisconsin — including ${parentLabelText}. We collaborate remotely by default and meet in person in the Milwaukee area when helpful.`,
            },
            {
              q: `Can ${serviceLower} help Wisconsin small businesses reduce manual work?`,
              a: `Absolutely. We scope ${serviceLower} around real ROI — fewer spreadsheet hours, faster lead response, and pages that convert ${parentLabelText} search traffic into booked work.`,
            },
          ]
        : []

      matrix.push({
        slug: `${parent.slug}/${service.slug}`,
        parentSlug: parent.slug,
        serviceSlug: service.slug,
        isMatrix: true,
        title: `${serviceLabel} in ${parentLabelText}${wiSuffix}`,
        headline: `${serviceLabel} for ${parentLabelText}${wiSuffix} Businesses`,
        description: `${serviceLabel} for ${parentLabelText}${wiSuffix} businesses — custom software, business systems, automation, and high-performance websites from SuchGrime.`,
        intro: `We help ${parentLabelText}${wiSuffix} businesses with ${serviceLower} — custom applications, workflow automation, internal dashboards, and web systems built around how you actually operate.`,
        body: `${parentLabelText}${wiSuffix} operators face unique market pressure — visibility, operational efficiency, and systems that scale without adding headcount. Our ${serviceLower} engagements combine custom engineering with technical SEO foundations: fast Next.js architecture, schema markup, internal linking, and automation that eliminates manual work.${wiBodyExtra} ${parent.intro.slice(0, 180)}${parent.intro.length > 180 ? "…" : ""} We scope every project around measurable outcomes — fewer spreadsheet hours, faster lead response, and systems built to rank for ${parentLabelText} + ${serviceLower} searches.`,
        features: [
          ...((service.features ?? []).slice(0, 3)),
          `${parentLabelText}${wiSuffix}-specific positioning`,
          "Structured SEO & FAQ schema",
          "Core Web Vitals optimization",
        ],
        faqs: [...baseFaqs, ...wiFaqs],
        keywords: [
          `${serviceLabel} ${parentLabelText}${wiSuffix}`,
          `${parentLabelText} ${serviceLower}`,
          `${parentLabelText}${wiSuffix} ${serviceLower} agency`,
          `${serviceLower} company ${parentLabelText}`,
          ...(isWi
            ? [
                `${parentLabelText.toLowerCase()} wi ${serviceLower}`,
                `wisconsin ${serviceLower} ${parentLabelText.toLowerCase()}`,
              ]
            : [`${parentLabelText} web agency`]),
        ],
      })
    }
  }

  return matrix
}

export async function getMatrixStaticParams(parentCollection: "locations" | "industries") {
  const pages = await getAllPagesForCollection(parentCollection)
  const services = await getAllPagesForCollection("services")
  return buildMatrixPages(
    parentCollection,
    pages.filter((p) => !p.isMatrix),
    services.filter((p) => !p.isMatrix),
  ).map((p) => ({
    slug: p.parentSlug!,
    serviceSlug: p.serviceSlug!,
  }))
}
