import { revalidatePath } from "next/cache"
import type { PseoCollectionId } from "@/lib/pseo/types"
import { getCollectionConfig } from "@/lib/pseo/registry"
import { services as staticServices } from "@/lib/pseo/content/services"
import { locations as staticLocations } from "@/lib/pseo/content/locations"
import { industries as staticIndustries } from "@/lib/pseo/content/industries"

const serviceSlugs = staticServices.map((s) => s.slug)

function revalidateMatrixForParent(
  collection: "locations" | "industries",
  parentSlug: string,
) {
  const config = getCollectionConfig(collection)
  for (const serviceSlug of serviceSlugs) {
    revalidatePath(`${config.path}/${parentSlug}/${serviceSlug}`)
  }
}

function revalidateAllMatrixForService(serviceSlug: string) {
  const locConfig = getCollectionConfig("locations")
  const indConfig = getCollectionConfig("industries")
  for (const loc of staticLocations) {
    revalidatePath(`${locConfig.path}/${loc.slug}/${serviceSlug}`)
  }
  for (const ind of staticIndustries) {
    revalidatePath(`${indConfig.path}/${ind.slug}/${serviceSlug}`)
  }
}

export function revalidateContentEntry(collection: PseoCollectionId, slug: string) {
  const config = getCollectionConfig(collection)
  revalidatePath(config.path)
  revalidatePath(`${config.path}/${slug}`)

  if (collection === "locations" || collection === "industries") {
    revalidateMatrixForParent(collection, slug)
    revalidatePath("/solutions")
    revalidatePath("/wisconsin")
  }

  if (collection === "services") {
    revalidateAllMatrixForService(slug)
    revalidatePath("/solutions")
  }

  if (collection === "blog") {
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/feed.xml")
  }

  if (collection === "glossary") {
    revalidatePath("/glossary")
    revalidatePath(`/glossary/${slug}`)
  }
}

export function revalidateCollection(collection: PseoCollectionId) {
  const config = getCollectionConfig(collection)
  revalidatePath(config.path)
  if (collection === "blog") {
    revalidatePath("/blog")
    revalidatePath("/feed.xml")
  }
  if (collection === "locations" || collection === "industries" || collection === "services") {
    revalidatePath("/solutions")
    revalidatePath("/wisconsin")
  }
}
