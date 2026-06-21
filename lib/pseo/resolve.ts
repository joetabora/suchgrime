import type { PseoCollectionId, ResolvedPseoPage } from "./types"
import { getCollectionConfig, getPageBySlug } from "./registry"

export async function resolvePage(
  collectionId: PseoCollectionId,
  slug: string,
): Promise<ResolvedPseoPage | null> {
  const collection = getCollectionConfig(collectionId)
  const page = await getPageBySlug(collectionId, slug)
  if (!page) return null

  const canonicalPath = `${collection.path}/${page.slug}`

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: collection.label, path: collection.path },
  ]

  if (page.isMatrix && page.parentSlug && page.serviceSlug) {
    const parent = await getPageBySlug(collectionId, page.parentSlug)
    if (parent && !parent.isMatrix) {
      breadcrumbs.push({ name: parent.title, path: `${collection.path}/${parent.slug}` })
    }
    const service = await getPageBySlug("services", page.serviceSlug)
    if (service) {
      breadcrumbs.push({ name: service.title, path: `/services/${service.slug}` })
    }
  }

  breadcrumbs.push({ name: page.title, path: canonicalPath })

  return { page, collection, breadcrumbs, canonicalPath }
}

export async function resolveMatrixPage(
  parentCollection: "locations" | "industries",
  parentSlug: string,
  serviceSlug: string,
): Promise<ResolvedPseoPage | null> {
  const matrixSlug = `${parentSlug}/${serviceSlug}`
  return resolvePage(parentCollection, matrixSlug)
}
