import { createOgImage, ogContentType, ogSize } from "@/lib/seo/og-image"

export const runtime = "edge"
export const alt = "Custom Software Development — SuchGrime"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage(
    "Custom Business Applications",
    "Internal dashboards, customer portals, and CRMs built for how you work.",
  )
}
