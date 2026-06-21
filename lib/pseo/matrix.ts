import type { PseoCollectionId, PseoPage } from "./types"
import { services } from "./content/services"
import { locations } from "./content/locations"
import { industries } from "./content/industries"

/**
 * Generates programmatic combination pages: parent entity × service.
 * Scales to thousands by adding rows to content files — no new route code needed.
 */
export function buildMatrixPages(
  parentCollection: PseoCollectionId,
  parents: PseoPage[],
  serviceList: PseoPage[] = services,
): PseoPage[] {
  const matrix: PseoPage[] = []

  for (const parent of parents) {
    if (parent.isMatrix) continue

    for (const service of serviceList) {
      const parentLabel = parent.title
      const serviceLabel = service.title

      matrix.push({
        slug: `${parent.slug}/${service.slug}`,
        parentSlug: parent.slug,
        serviceSlug: service.slug,
        isMatrix: true,
        title: `${serviceLabel} in ${parentLabel}`,
        description: `${serviceLabel} for ${parentLabel} businesses — custom websites, automation, and SEO from SuchGrime.`,
        intro: `We help ${parentLabel} businesses with ${serviceLabel.toLowerCase()} — from strategy and design to launch-ready Next.js builds and workflow automation.`,
        features: [
          ...((service.features ?? []).slice(0, 3)),
          `Local positioning for ${parentLabel}`,
          "Structured SEO & schema markup",
        ],
        faqs: [
          {
            q: `Do you work with ${parentLabel} businesses remotely?`,
            a: "Yes. We partner with businesses nationwide and tailor every build to your market and operations.",
          },
          {
            q: `What's included in ${serviceLabel.toLowerCase()}?`,
            a: service.intro.slice(0, 200) + (service.intro.length > 200 ? "…" : ""),
          },
        ],
        keywords: [
          `${serviceLabel} ${parentLabel}`,
          `${parentLabel} ${serviceLabel.toLowerCase()}`,
          `${parentLabel} web agency`,
        ],
      })
    }
  }

  return matrix
}

export function getMatrixStaticParams(parentCollection: "locations" | "industries") {
  const parents = parentCollection === "locations" ? locations : industries
  return buildMatrixPages(parentCollection, parents, services).map((p) => ({
    slug: p.parentSlug!,
    serviceSlug: p.serviceSlug!,
  }))
}
