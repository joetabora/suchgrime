import { getSiteUrl } from "@/lib/utils"

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
]

export async function pingIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY
  if (!key || urls.length === 0) return

  const host = new URL(getSiteUrl()).host
  const body = {
    host,
    key,
    keyLocation: `${getSiteUrl()}/${key}.txt`,
    urlList: urls.map((path) => (path.startsWith("http") ? path : `${getSiteUrl()}${path}`)),
  }

  await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    ),
  )
}

export function urlsForContentEntry(collection: string, slug: string): string[] {
  const paths = [`/${collection}/${slug}`, `/${collection}`]
  if (collection === "blog") {
    paths.push("/blog", "/feed.xml")
  }
  if (collection === "locations" || collection === "industries") {
    paths.push("/solutions", "/wisconsin")
  }
  return paths
}
