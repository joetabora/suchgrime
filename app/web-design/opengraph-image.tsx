import { createOgImage, ogContentType, ogSize } from "@/lib/seo/og-image"

export const runtime = "edge"
export const alt = "Web Design & Development — SuchGrime"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage(
    "Professional Websites",
    "High-performance business sites, e-commerce, and SEO foundations.",
  )
}
