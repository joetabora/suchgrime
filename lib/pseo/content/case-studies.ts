import { siteConfig } from "@/lib/site-config"
import type { PseoPage } from "../types"

const industryTags: Record<string, string[]> = {
  "block-and-blade": ["home-services", "restaurants"],
  "deadset-ink": ["professional-services"],
  "parlor-desk": ["professional-services", "home-services"],
}

const capabilityStudies: PseoPage[] = [
  {
    slug: "liveque",
    title: "LiveQue",
    description:
      "Customer-facing appointment display platform that gives waiting customers real-time queue visibility and reduces front-desk friction for service businesses.",
    intro:
      "LiveQue is a customer appointment display system built for service businesses that need waiting customers to see queue status in real time — reducing front-desk questions and improving the waiting experience.",
    tags: ["professional-services", "home-services", "custom-software"],
    features: [
      "Real-time queue display",
      "Customer-facing appointment visibility",
      "Service business workflow integration",
      "Reduced front-desk friction",
    ],
    faqs: [
      {
        q: "Can you build a customer display system like LiveQue?",
        a: "Yes — we build customer-facing portals and display systems tailored to your booking workflow, branding, and operational needs.",
      },
      {
        q: "Does LiveQue integrate with existing booking tools?",
        a: "Custom integrations can connect display systems to your scheduling backend, CRM, or internal admin tools.",
      },
    ],
  },
  {
    slug: "harley-event-management",
    title: "Harley Event Management",
    description:
      "Custom event management tools for dealership and event operations — registration, scheduling, vendor coordination, and attendee tracking.",
    intro:
      "Harley event management projects include custom registration systems, vendor coordination tools, and attendee tracking built for complex dealership and event company workflows.",
    tags: ["ecommerce", "professional-services", "custom-software"],
    features: [
      "Event registration systems",
      "Vendor and attendee coordination",
      "Dealership event workflows",
      "Custom scheduling and tracking",
    ],
    faqs: [
      {
        q: "Can you build event management software for our dealership?",
        a: "Yes — we scope event registration, vendor management, and attendee tracking around your specific event types and operational workflow.",
      },
      {
        q: "Do you handle complex multi-day events?",
        a: "We build systems that handle registration, scheduling, vendor coordination, and reporting for events of any complexity.",
      },
    ],
  },
]

const demoStudies: PseoPage[] = siteConfig.work
  .filter((w) => w.live)
  .map((w) => ({
    slug: w.slug,
    title: w.title,
    description: w.description,
    intro: w.description,
    tags: [...w.tags, ...(industryTags[w.slug] ?? [])],
    href: w.href,
    image: w.image || undefined,
    features:
      "kind" in w && w.kind === "app"
        ? [
            "Custom internal application",
            "Dashboard and CRUD workflows",
            "TypeScript and React architecture",
            "Live portfolio demo",
          ]
        : [
            "Custom design system",
            "Performance-optimized build",
            "Mobile-first responsive layout",
            "Live portfolio demo",
          ],
    faqs: [
      {
        q: `Can you build something like ${w.title}?`,
        a: "Yes — every project starts with your workflow, goals, and operational requirements. We tailor features, integrations, and UX to your business.",
      },
      {
        q: "Is this a template?",
        a: "No. Each project showcases a custom engineering approach. Your system is designed and built specifically for how you operate.",
      },
    ],
  }))

export const caseStudies: PseoPage[] = [...demoStudies, ...capabilityStudies]

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}
