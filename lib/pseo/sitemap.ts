import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/utils"
import { getAllCollectionIds, getAllPagesForCollection, getCollectionConfig } from "./registry"

export async function getAllPseoSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const id of getAllCollectionIds()) {
    const config = getCollectionConfig(id)
    entries.push({
      url: `${base}${config.path}`,
      lastModified: now,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    })

    const pages = await getAllPagesForCollection(id)
    for (const page of pages) {
      entries.push({
        url: `${base}${config.path}/${page.slug}`,
        lastModified: page.date ? new Date(page.date) : now,
        changeFrequency: config.changeFrequency,
        priority: page.isMatrix ? config.priority - 0.1 : config.priority - 0.05,
      })
    }
  }

  return entries
}

export async function getPseoPageCount(): Promise<number> {
  const ids = getAllCollectionIds()
  let sum = 0
  for (const id of ids) {
    const pages = await getAllPagesForCollection(id)
    sum += pages.length + 1
  }
  return sum
}
