import type { PseoCollectionId, PseoPage } from "./types"
import { getAllPagesForCollection } from "./registry"

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

    for (const service of serviceList) {
      if (service.isMatrix) continue

      const parentLabelText = parent.title
      const serviceLabel = service.title
      const serviceLower = serviceLabel.toLowerCase()

      matrix.push({
        slug: `${parent.slug}/${service.slug}`,
        parentSlug: parent.slug,
        serviceSlug: service.slug,
        isMatrix: true,
        title: `${serviceLabel} in ${parentLabelText}`,
        headline: `${serviceLabel} for ${parentLabelText} Businesses`,
        description: `${serviceLabel} for ${parentLabelText} businesses — custom Next.js websites, workflow automation, and SEO from SuchGrime.`,
        intro: `We help ${parentLabelText} businesses with ${serviceLower} — from discovery and design to launch-ready builds, structured SEO, and automation that reduces manual work.`,
        body: `${parentLabelText} operators face unique market pressure — visibility, speed, and operational efficiency matter. Our ${serviceLower} engagements for ${parentLabelText} combine conversion-focused UX with technical SEO foundations: fast Next.js architecture, schema markup, internal linking, and CMS-ready content structures. ${parent.intro.slice(0, 180)}${parent.intro.length > 180 ? "…" : ""} We scope every project around measurable outcomes — more qualified leads, fewer manual tasks, and pages built to rank for ${parentLabelText} + ${serviceLower} searches.`,
        features: [
          ...((service.features ?? []).slice(0, 3)),
          `${parentLabelText}-specific positioning`,
          "Structured SEO & FAQ schema",
          "Core Web Vitals optimization",
        ],
        faqs: [
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
            a: `Yes. We build location- and service-aware pages, FAQ schema, internal links, and technical SEO foundations targeting ${parentLabelText} + ${serviceLower} keyword combinations.`,
          },
          {
            q: `Do you integrate with tools our ${parentLabelText} team already uses?`,
            a: "We wire CRMs, scheduling platforms, payment processors, email tools, and custom APIs so your site and operations stay connected after launch.",
          },
          {
            q: `Why choose SuchGrime over a local ${parentLabelText} agency?`,
            a: "We ship on modern Next.js stacks with automation and programmatic SEO built in — not as afterthoughts. You get agency-grade craft with engineering discipline.",
          },
        ],
        keywords: [
          `${serviceLabel} ${parentLabelText}`,
          `${parentLabelText} ${serviceLower}`,
          `${parentLabelText} ${serviceLower} agency`,
          `${serviceLower} company ${parentLabelText}`,
          `${parentLabelText} web agency`,
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
