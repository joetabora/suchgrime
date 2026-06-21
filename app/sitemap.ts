import type { MetadataRoute } from "next"
import { getAllPseoSitemapEntries } from "@/lib/pseo/sitemap"
import { getSiteUrl } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const now = new Date()

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ]

  return [...coreRoutes, ...(await getAllPseoSitemapEntries())]
}
