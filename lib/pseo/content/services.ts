import { siteConfig } from "@/lib/site-config"
import type { PseoPage } from "../types"

/** Canonical service pages — single source synced with site-config */
export const services: PseoPage[] = siteConfig.servicePages.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.description,
  intro: s.longDescription,
  features: [...s.features],
  faqs: [...s.faqs],
  keywords: [s.title, "SuchGrime", "web agency"],
}))

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
