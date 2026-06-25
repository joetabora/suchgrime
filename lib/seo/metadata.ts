import { getSiteUrl } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"

export interface PageMetaInput {
  title: string
  description: string
  path: string
  /** Override the canonical URL (defaults to `path`). Use to consolidate overlapping pages. */
  canonicalPath?: string
  keywords?: string[]
  ogImage?: string
  ogType?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noIndex?: boolean
}

export function buildMetadata(input: PageMetaInput): Metadata {
  const url = `${getSiteUrl()}${input.path}`
  const canonicalUrl = `${getSiteUrl()}${input.canonicalPath ?? input.path}`
  const ogImage = input.ogImage ?? `${getSiteUrl()}/opengraph-image`

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords ?? [
      "web development",
      "business automation",
      "Next.js agency",
      siteConfig.name,
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: input.ogType ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
      ...(input.authors && { authors: input.authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      images: [ogImage],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
