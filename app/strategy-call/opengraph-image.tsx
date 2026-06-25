import { createOgImage, ogContentType, ogSize } from "@/lib/seo/og-image"

export const runtime = "edge"
export const alt = "Book A Strategy Call — SuchGrime"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage(
    "Book A Strategy Call",
    "30-minute consultation for custom software, automation, and business systems.",
  )
}
