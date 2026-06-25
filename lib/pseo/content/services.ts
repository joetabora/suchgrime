import { siteConfig } from "@/lib/site-config"
import type { PseoPage } from "../types"

const serviceKeywords: Record<string, string[]> = {
  "custom-software": [
    "custom business software wisconsin",
    "custom software development wisconsin",
    "small business app development",
    "small business software development",
    "custom business applications",
    "internal dashboard development",
    "client portal development",
    "custom CRM development",
    "milwaukee software development",
  ],
  "ai-automation": [
    "business automation milwaukee",
    "business automation wisconsin",
    "AI automation services",
    "business process automation",
    "workflow automation",
    "CRM automation",
    "custom workflow software",
    "milwaukee business automation",
  ],
  "web-development": [
    "milwaukee web design",
    "wisconsin web development",
    "performance-focused website design",
    "Core Web Vitals optimization",
    "next.js web development",
  ],
  "ecommerce-booking": [
    "online booking system development",
    "ecommerce website development",
    "appointment scheduling website",
    "Stripe checkout integration",
    "conversion-focused booking flows",
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
  keywords: serviceKeywords[s.slug] ?? [s.title, "SuchGrime", "custom software development"],
}))

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}
