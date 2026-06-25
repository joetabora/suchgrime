import { siteConfig } from "@/lib/site-config"
import type { PseoPage } from "../types"

const serviceKeywords: Record<string, string[]> = {
  "web-development": [
    "custom Next.js development",
    "React web development agency",
    "performance-focused website design",
    "Core Web Vitals optimization",
    "SuchGrime web development",
  ],
  "business-automation": [
    "business automation agency",
    "workflow automation for small business",
    "internal tools development",
    "Zapier integration services",
    "custom admin dashboard development",
  ],
  "ecommerce-booking": [
    "ecommerce website development",
    "online booking system development",
    "appointment scheduling website",
    "Stripe checkout integration",
    "conversion-focused booking flows",
  ],
  "custom-software": [
    "custom software development wisconsin",
    "small business software development",
    "custom business applications",
    "internal dashboard development",
    "client portal development",
    "custom CRM development",
  ],
  "ai-automation": [
    "AI automation services",
    "business process automation",
    "workflow automation",
    "CRM automation",
    "custom workflow software",
    "business automation wisconsin",
  ],
}

/** Canonical service pages — single source synced with site-config */
export const services: PseoPage[] = siteConfig.servicePages.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.description,
  intro: s.longDescription,
  features: [...s.features],
  faqs: [...s.faqs],
  keywords: serviceKeywords[s.slug] ?? [s.title, "SuchGrime", "web agency"],
}))

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
