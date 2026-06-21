import type { PseoPage } from "../types"
import { enrichIndustry } from "./industry-helpers"

const rawIndustries: PseoPage[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Web development and automation for healthcare practices and clinics.",
    intro:
      "Patient-friendly websites, secure intake flows, and appointment automation — built for healthcare operators who need compliance-minded UX without sacrificing speed.",
    features: ["Appointment booking flows", "HIPAA-aware form patterns", "Provider directory pages", "Patient intake automation"],
    keywords: ["healthcare web development", "medical practice website", "clinic automation", "HIPAA website design"],
  },
  {
    slug: "legal",
    title: "Legal",
    description: "Websites and automation for law firms and legal practices.",
    intro:
      "Trust-building sites with clear practice-area architecture, intake forms, and CRM wiring so your firm captures and qualifies leads consistently.",
    features: ["Practice area landing pages", "Consultation request flows", "CRM integration", "Programmatic SEO for local search"],
    keywords: ["law firm web development", "legal website design", "attorney marketing site", "law firm SEO"],
  },
  {
    slug: "home-services",
    title: "Home Services",
    description: "Web development for HVAC, plumbing, electrical, and home service companies.",
    intro:
      "Service-area pages, click-to-call UX, and booking automation that help home service businesses dominate local search.",
    features: ["Service area programmatic pages", "Quote request forms", "Dispatch workflow hooks", "Review & trust modules"],
    keywords: ["home services website", "contractor web development", "HVAC website design"],
  },
  {
    slug: "restaurants",
    title: "Restaurants & Hospitality",
    description: "Websites and booking systems for restaurants, bars, and hospitality brands.",
    intro:
      "Menu-forward design, reservation flows, and event pages that match the energy of your brand — optimized for mobile and local discovery.",
    features: ["Menu & hours management patterns", "Reservation integrations", "Event landing pages", "LocalBusiness schema"],
    keywords: ["restaurant website design", "hospitality web development"],
  },
  {
    slug: "fitness",
    title: "Fitness & Wellness",
    description: "Web development for gyms, studios, and wellness brands.",
    intro:
      "Class schedules, membership CTAs, and trainer profiles with automation that keeps your front desk out of spreadsheet hell.",
    features: ["Class booking UX", "Membership funnels", "Trainer profile templates", "Email & SMS workflow hooks"],
    keywords: ["gym website design", "fitness studio web development"],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description: "Web development for brokers, agents, and property management.",
    intro:
      "Listing showcases, neighborhood guides, and lead capture systems designed for real estate professionals who compete on visibility.",
    features: ["Listing & IDX-ready layouts", "Neighborhood guide templates", "Lead routing automation", "Agent bio pages"],
    keywords: ["real estate website development", "realtor web design"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce & Retail",
    description: "E-commerce websites and checkout automation for retail brands.",
    intro:
      "Product storytelling, checkout optimization, and inventory-adjacent workflows — from launch-day landing pages to full storefront builds.",
    features: ["Shopify & headless patterns", "Checkout UX", "Product SEO templates", "Order notification flows"],
    keywords: ["ecommerce web development", "retail website agency", "Shopify development agency"],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    description: "Websites and automation for consultants, agencies, and B2B service firms.",
    intro:
      "Authority-building sites with case study architecture, resource hubs, and CRM-connected intake — built for firms that sell expertise.",
    features: ["Case study templates", "Resource & blog hubs", "Proposal intake flows", "Client portal patterns"],
    keywords: ["B2B web development", "consulting firm website", "agency website design"],
  },
]

export const industries: PseoPage[] = rawIndustries.map(enrichIndustry)
