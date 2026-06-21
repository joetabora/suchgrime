import type { MetadataRoute } from "next"
import {
  getCoreSitemapEntries,
  getLocationsSitemapEntries,
  getContentSitemapEntries,
} from "@/lib/pseo/sitemap"

export async function generateSitemaps() {
  return [{ id: "core" }, { id: "locations" }, { id: "content" }]
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id

  if (id === "core") return getCoreSitemapEntries()
  if (id === "locations") return getLocationsSitemapEntries()
  return getContentSitemapEntries()
}
