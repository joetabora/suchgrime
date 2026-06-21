import type { PseoPage } from "../types"

export const softwareProducts: PseoPage[] = [
  {
    slug: "parlor-desk",
    title: "Parlor Desk",
    description: "Booking admin for service businesses — appointments, clients, status workflows, and dashboard stats.",
    intro:
      "Parlor Desk is an internal booking admin demo showcasing how SuchGrime builds operational tools — CRUD, dashboards, and client-side persistence patterns ready for production PostgreSQL backends.",
    href: "/work/parlor-desk",
    tags: ["React", "TypeScript", "Internal App", "CRUD"],
    features: [
      "Appointment CRUD with status workflow",
      "Client list derived from bookings",
      "Dashboard stats and today's schedule",
      "Browser persistence demo → Postgres-ready",
    ],
    faqs: [
      { q: "Can this be customized for my business?", a: "Absolutely. We adapt booking fields, services, notifications, and auth for your operations." },
      { q: "Does it connect to my calendar?", a: "Production builds integrate with Google Calendar, Calendly, or custom scheduling APIs." },
    ],
    keywords: ["booking admin", "appointment software", "service business dashboard"],
  },
  {
    slug: "workflow-hub",
    title: "Workflow Hub",
    description: "Conceptual automation control panel for connecting business tools and monitoring workflows.",
    intro:
      "Workflow Hub represents how we design automation observability — trigger logs, integration status, and replay tools for Zapier, Make, and custom webhook pipelines.",
    features: [
      "Integration health dashboard",
      "Trigger & action audit log",
      "Error alerting patterns",
      "Webhook replay tooling",
    ],
    faqs: [
      { q: "Is Workflow Hub available off the shelf?", a: "It's a reference architecture we customize per client stack — not a SaaS product." },
    ],
    keywords: ["workflow automation dashboard", "integration monitoring"],
  },
]
