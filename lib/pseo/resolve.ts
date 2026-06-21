import type { PseoCollectionId, ResolvedPseoPage } from "./types"
import { getCollectionConfig, getPageBySlug } from "./registry"

export function resolvePage(collectionId: PseoCollectionId, slug: string): ResolvedPseoPage | null {
  const collection = getCollectionConfig(collectionId)
  const page = getPageBySlug(collectionId, slug)
  if (!page) return null

  const canonicalPath = `${collection.path}/${page.slug}`

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: collection.label, path: collection.path },
  ]

  if (page.isMatrix && page.parentSlug && page.serviceSlug) {
    const parent = getPageBySlug(collectionId, page.parentSlug)
    if (parent && !parent.isMatrix) {
      breadcrumbs.push({ name: parent.title, path: `${collection.path}/${parent.slug}` })
    }
    const service = getPageBySlug("services", page.serviceSlug)
    if (service) {
      breadcrumbs.push({ name: service.title, path: `/services/${service.slug}` })
    }
  }

  breadcrumbs.push({ name: page.title, path: canonicalPath })

  return { page, collection, breadcrumbs, canonicalPath }
}

export function resolveMatrixPage(
  parentCollection: "locations" | "industries",
  parentSlug: string,
  serviceSlug: string,
): ResolvedPseoPage | null {
  const matrixSlug = `${parentSlug}/${serviceSlug}`
  return resolvePage(parentCollection, matrixSlug)
}
