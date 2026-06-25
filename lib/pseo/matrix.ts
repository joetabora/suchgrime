import type { PseoCollectionId, PseoPage } from "./types"
import { getAllPagesForCollection } from "./registry"
import { getServiceAngle } from "./service-angles"

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
    const parentLabelText = parent.title
    const parentLower = parentLabelText.toLowerCase()
    const wiSuffix = isWi ? ", WI" : ""

    for (const service of serviceList) {
      if (service.isMatrix) continue

      const serviceLabel = service.title
      const serviceLower = serviceLabel.toLowerCase()
      const angle = getServiceAngle(service.slug)

      const wiBodyExtra =
        isWi && angle.wiBodyExtra ? ` ${angle.wiBodyExtra(parentLabelText, serviceLower)}` : ""

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
          a:
            service.slug === "custom-software"
              ? "Focused internal tools often launch in 4–12 weeks. Larger systems with multiple integrations are scoped with clear milestones during your strategy call."
              : service.slug === "ai-automation"
                ? "Automation projects vary by complexity — simple workflow wiring may take 2–4 weeks; multi-system pipelines are scoped with clear milestones."
                : "Marketing sites typically launch in 4–8 weeks. Automation and booking integrations are scoped separately with clear milestones.",
        },
        {
          q: `Can you help us rank for ${parentLabelText} ${serviceLower} searches?`,
          a: `Yes. We build location- and service-aware pages, FAQ schema, internal links, and technical SEO foundations targeting ${parentLabelText}${wiSuffix} + ${serviceLower} keyword combinations.`,
        },
        {
          q: `Do you integrate with tools our ${parentLabelText} team already uses?`,
          a: "We wire CRMs, scheduling platforms, payment processors, email tools, and custom APIs so your systems stay connected after launch.",
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
              a: `Absolutely. We scope ${serviceLower} around real ROI — fewer spreadsheet hours, faster lead response, and systems that help ${parentLabelText} operators compete without adding headcount.`,
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
        description: angle.description(parentLabelText, serviceLabel, wiSuffix),
        intro: angle.intro(parentLabelText, serviceLower, wiSuffix),
        body: `${angle.body(parentLabelText, serviceLower, wiSuffix, parent.intro)}${wiBodyExtra}`,
        features: [
          ...((service.features ?? []).slice(0, 3)),
          `${parentLabelText}${wiSuffix}-specific positioning`,
          "Structured SEO & FAQ schema",
          "Core Web Vitals optimization",
        ],
        faqs: [...baseFaqs, ...wiFaqs],
        keywords: [
          ...angle.keywords(parentLabelText, parentLower, serviceLabel, serviceLower, wiSuffix),
          ...(isWi
            ? [
                `${parentLower} wi ${service.slug.replace(/-/g, " ")}`,
                `wisconsin ${service.slug.replace(/-/g, " ")} ${parentLower}`,
              ]
            : [`${parentLower} ${service.slug.replace(/-/g, " ")} company`]),
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
