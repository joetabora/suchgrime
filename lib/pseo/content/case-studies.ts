import { siteConfig } from "@/lib/site-config"
import type { PseoPage } from "../types"

const industryTags: Record<string, string[]> = {
  "block-and-blade": ["home-services", "restaurants"],
  "deadset-ink": ["professional-services"],
  "parlor-desk": ["professional-services", "home-services"],
}

export const caseStudies: PseoPage[] = siteConfig.work
  .filter((w) => w.live)
  .map((w) => ({
    slug: w.slug,
    title: w.title,
    description: w.description,
    intro: w.description,
    tags: [...w.tags, ...(industryTags[w.slug] ?? [])],
    href: w.href,
    image: w.image || undefined,
    features: [
      "Custom design system",
      "Performance-optimized build",
      "Mobile-first responsive layout",
      "Live portfolio demo",
    ],
    faqs: [
      {
        q: `Can you build something like ${w.title}?`,
        a: "Yes — every project starts with your brand, goals, and workflow requirements. We tailor layout, features, and integrations to your business.",
      },
      {
        q: "Is this a template?",
        a: "No. Each demo showcases a custom build approach. Your site or app is designed and engineered specifically for your brand.",
      },
    ],
  }))
