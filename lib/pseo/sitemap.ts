import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/utils"
import { getAllCollectionIds, getAllPagesForCollection, getCollectionConfig } from "./registry"
import { serviceCanonicalOverrides } from "@/lib/seo/site-links"

const LOCATION_COLLECTIONS = new Set(["locations"])

async function buildCollectionEntries(
  ids: ReturnType<typeof getAllCollectionIds>,
): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const id of ids) {
    const config = getCollectionConfig(id)
    entries.push({
      url: `${base}${config.path}`,
      lastModified: now,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    })

    const pages = await getAllPagesForCollection(id)
    for (const page of pages) {
      if (id === "services" && serviceCanonicalOverrides[page.slug]) continue
      entries.push({
        url: `${base}${config.path}/${page.slug}`,
        lastModified: page.lastModified
          ? new Date(page.lastModified)
          : page.date
            ? new Date(page.date)
            : now,
        changeFrequency: config.changeFrequency,
        priority: page.isMatrix ? config.priority - 0.1 : config.priority - 0.05,
      })
    }
  }

  return entries
}

export async function getCoreSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/wisconsin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/custom-software`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ai-automation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/web-design`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/strategy-call`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ]
}

export async function getLocationsSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return buildCollectionEntries(getAllCollectionIds().filter((id) => LOCATION_COLLECTIONS.has(id)))
}

export async function getContentSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return buildCollectionEntries(getAllCollectionIds().filter((id) => !LOCATION_COLLECTIONS.has(id)))
}

/** @deprecated Use split sitemap helpers — kept for backwards compatibility */
export async function getAllPseoSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const [locations, content] = await Promise.all([
    getLocationsSitemapEntries(),
    getContentSitemapEntries(),
  ])
  return [...locations, ...content]
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
