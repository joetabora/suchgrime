import type { PseoPage } from "../types"

export const resources: PseoPage[] = [
  {
    slug: "programmatic-seo-guide",
    title: "Programmatic SEO Guide",
    description: "How to scale indexable pages with templates, structured data, and clean URL architecture.",
    intro:
      "Programmatic SEO lets you publish thousands of unique, valuable pages from structured data — without duplicating code. This guide covers the architecture SuchGrime uses for location, industry, and service matrix pages.",
    features: [
      "Template-driven page generation",
      "Canonical URL strategy",
      "JSON-LD per page type",
      "Sitemap & internal linking at scale",
    ],
    body: "Use one template per entity type, generate static params from your content registry, and enforce unique intros per page to avoid thin content penalties.",
    tags: ["SEO", "Architecture"],
    date: "2025-06-01",
  },
  {
    slug: "nextjs-performance-playbook",
    title: "Next.js Performance Playbook",
    description: "Practical steps to hit Lighthouse 95+ on Next.js App Router marketing sites.",
    intro:
      "Server Components, next/font, next/image, and route-level code splitting — the playbook we follow on every SuchGrime launch.",
    features: ["RSC-first architecture", "Font & image optimization", "CLS prevention", "Bundle analysis workflow"],
    tags: ["Next.js", "Performance"],
    date: "2025-05-15",
  },
  {
    slug: "automation-roi-calculator",
    title: "Automation ROI Framework",
    description: "Estimate time saved and payback period for business automation projects.",
    intro:
      "Before building custom dashboards or Zapier flows, quantify hours saved per week. This framework helps operators prioritize high-ROI automations first.",
    features: ["Task audit worksheet", "Hourly cost modeling", "Payback timeline", "Build vs. buy decision tree"],
    tags: ["Automation", "Business"],
    date: "2025-04-20",
  },
  {
    slug: "local-seo-schema-checklist",
    title: "Local SEO Schema Checklist",
    description: "Structured data checklist for service businesses targeting local search.",
    intro:
      "LocalBusiness, Service, FAQ, and BreadcrumbList schema — implemented correctly — improve eligibility for rich results and clarify entity relationships to crawlers.",
    features: ["Schema type reference", "Validation tools", "Common mistakes", "Multi-location patterns"],
    tags: ["SEO", "Local"],
    date: "2025-03-10",
  },
]
