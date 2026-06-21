import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/utils"
import { getAllCollectionIds, getAllPagesForCollection, getCollectionConfig } from "./registry"

export function getAllPseoSitemapEntries(): MetadataRoute.Sitemap {
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

    for (const page of getAllPagesForCollection(id)) {
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

export function getPseoPageCount(): number {
  return getAllCollectionIds().reduce(
    (sum, id) => sum + getAllPagesForCollection(id).length + 1,
    0,
  )
}
