import { createOgImage, ogContentType, ogSize } from "@/lib/seo/og-image"

export const runtime = "edge"
export const alt = "AI Automation Services — SuchGrime"
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return createOgImage(
    "AI & Automation",
    "Lead routing, workflow automation, and AI assistants for growing businesses.",
  )
}
