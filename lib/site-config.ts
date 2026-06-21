export const siteConfig = {
  name: "SuchGrime",
  subtitle: "Web Development & Business Automation",
  domain: "suchgrime.com",
  tagline: "Premium web craft and automation for brands that move fast.",
  description:
    "SuchGrime is a premium web development and business automation agency building fast, accessible websites, internal tools, and workflow systems for brands that refuse to blend in.",
  heroHeadline: "PREMIUM WEB CRAFT FOR BRANDS THAT DON'T DO BORING",
  heroSubtext:
    "SuchGrime builds bold, high-performance websites and business automation — booking systems, dashboards, integrations, and internal tools that save time and drive revenue.",
  about: {
    story:
      "We started as builders tired of cookie-cutter templates and disconnected tools. SuchGrime is a studio rooted in urban culture and engineering discipline — we bring raw creative energy to every pixel and every workflow. Local brands, startups, and operators who need sites and systems that actually work — that's our lane.",
    stats: [
      { label: "Approach", value: "Full-Stack Ready" },
      { label: "Standard", value: "Mobile-First" },
      { label: "Focus", value: "Performance" },
      { label: "Built-In", value: "A11y + SEO" },
    ],
  },
  marqueePhrases: [
    "NEXT.JS",
    "REACT",
    "TAILWIND",
    "POSTGRES",
    "AUTOMATION",
    "UI/UX",
    "RESPONSIVE",
    "ACCESSIBLE",
    "TYPESCRIPT",
    "DEPLOY",
  ],
  serviceGroups: [
    {
      title: "Design & Frontend",
      items: [
        { name: "Custom React & Next.js Websites", description: "Marketing sites, landing pages, and multi-route experiences built for your brand." },
        { name: "UI/UX Design", description: "Interactive prototypes, wireframes, and polished visual direction." },
        { name: "Tailwind Design Systems", description: "Reusable tokens, components, and consistent styling at scale." },
        { name: "Motion & Micro-interactions", description: "Framer Motion animations that feel alive, not distracting." },
        { name: "Responsive Layouts", description: "Mobile-first builds that look sharp on every screen size." },
      ],
    },
    {
      title: "Engineering & Integration",
      items: [
        { name: "TypeScript & Modern JS", description: "Type-safe, maintainable codebases built for growth." },
        { name: "API Integration", description: "REST endpoints, third-party services, and data wiring." },
        { name: "Forms & Workflows", description: "Validation, multi-step flows, and client-side UX patterns." },
        { name: "E-commerce & Booking", description: "Checkout flows, appointment systems, and conversion paths." },
        { name: "CMS & Headless Content", description: "MDX blogs, content models, and headless CMS setup." },
      ],
    },
    {
      title: "Business Automation",
      items: [
        { name: "Workflow Automation", description: "Zapier, Make, and custom triggers that eliminate manual work." },
        { name: "Internal Dashboards", description: "Booking admin, CRM views, and ops tools your team actually uses." },
        { name: "CRM & Booking Wiring", description: "Connect forms, calendars, and notifications into one flow." },
        { name: "Data Pipelines", description: "PostgreSQL-backed systems with reliable sync and reporting." },
        { name: "Process Optimization", description: "Audit, redesign, and automate repetitive business tasks." },
      ],
    },
    {
      title: "Launch & Quality",
      items: [
        { name: "Performance Optimization", description: "Core Web Vitals, lazy loading, and bundle tuning." },
        { name: "SEO & Structured Data", description: "Metadata, schema markup, sitemaps, and crawl-friendly architecture." },
        { name: "Accessibility", description: "WCAG-minded patterns, keyboard nav, and screen reader support." },
        { name: "Deployment", description: "Vercel, Netlify, or custom hosting — production-ready handoff." },
        { name: "Git & CI-Ready Structure", description: "Clean repos, linting, and workflows your team can extend." },
      ],
    },
  ],
  servicePages: [
    {
      slug: "web-development",
      title: "Web Development",
      description: "Custom Next.js and React websites engineered for performance, SEO, and conversion.",
      longDescription:
        "We build premium marketing sites, landing pages, and web applications with Next.js, TypeScript, and Tailwind CSS. Every project is mobile-first, accessibility-minded, and optimized for Core Web Vitals and long-term SEO growth.",
      features: [
        "Next.js App Router architecture",
        "Server-side rendering and static generation",
        "Design systems with Tailwind CSS",
        "Framer Motion micro-interactions",
        "Lighthouse scores above 95",
      ],
      faqs: [
        { q: "What stack do you use?", a: "Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL when backend data is needed." },
        { q: "Do you handle SEO?", a: "Yes — metadata, structured schema, sitemaps, and canonical URLs are built in from day one." },
      ],
    },
    {
      slug: "business-automation",
      title: "Business Automation",
      description: "Workflow automation, internal dashboards, and integrations that eliminate manual work.",
      longDescription:
        "From booking admin tools to CRM wiring and Zapier/Make automations, we connect your tools and build custom systems so your team spends less time on repetitive tasks and more time on growth.",
      features: [
        "Custom internal apps and dashboards",
        "Zapier and Make workflow design",
        "PostgreSQL-backed data systems",
        "Form-to-CRM pipelines",
        "Booking and notification flows",
      ],
      faqs: [
        { q: "Can you automate our existing tools?", a: "Yes — we integrate with most SaaS platforms via APIs, webhooks, and automation platforms." },
        { q: "Do you build custom admin panels?", a: "Absolutely. Parlor Desk in our portfolio is a live demo of a booking admin we can tailor for your business." },
      ],
    },
    {
      slug: "ecommerce-booking",
      title: "E-commerce & Booking",
      description: "Checkout flows, appointment systems, and conversion paths that turn visitors into customers.",
      longDescription:
        "Whether you need an online store, a booking calendar, or a multi-step inquiry flow, we design and build conversion-focused experiences with clean UX and reliable backend wiring.",
      features: [
        "Appointment booking systems",
        "E-commerce checkout flows",
        "Payment and form integrations",
        "Status workflows and notifications",
        "Client tracking dashboards",
      ],
      faqs: [
        { q: "Can you connect to our calendar?", a: "We integrate with Google Calendar, Calendly, and custom scheduling backends." },
        { q: "Do you support payments?", a: "Yes — Stripe and other payment providers can be wired into your checkout or booking flow." },
      ],
    },
  ],
  work: [
    {
      slug: "block-and-blade",
      title: "Block & Blade Barbershop",
      description:
        "Urban informational site with bold typography, scroll-driven sections, and a gritty inner-city aesthetic. Full single-page experience with services menu, team, gallery, and contact.",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop&grayscale",
      tags: ["React", "Tailwind", "Framer Motion", "Single Page"],
      live: true,
      href: "/work/block-and-blade",
    },
    {
      slug: "deadset-ink",
      title: "Deadset Ink",
      description:
        "Hardcore tattoo parlor with an editorial layout — full-bleed hero, horizontal gallery scroll, accordion services, and alternating artist profiles. A different structure from our barber demo.",
      image: "https://images.unsplash.com/photo-1769605767701-6e5a680ef685?w=800&h=600&fit=crop",
      tags: ["React", "Tailwind", "Framer Motion", "Single Page"],
      live: true,
      href: "/work/deadset-ink",
    },
    {
      slug: "parlor-desk",
      title: "Parlor Desk",
      description:
        "Internal booking admin for service businesses — appointment CRUD, client tracking, status workflow, and dashboard stats. Persists in-browser to demo real app behavior.",
      image: "",
      tags: ["React", "TypeScript", "Internal App", "CRUD"],
      live: true,
      href: "/work/parlor-desk",
      kind: "app" as const,
    },
    {
      slug: "coming-soon-3",
      title: "Fresh Fade",
      description: "More work from the studio — soon.",
      image: "",
      tags: ["Coming Soon"],
      live: false,
      href: "",
    },
  ],
  process: [
    { step: "01", title: "Discover", description: "Goals, audience, workflows — we dig into what makes your brand and operations tick." },
    { step: "02", title: "Design", description: "Layout, typography, automation map — the blueprint takes shape." },
    { step: "03", title: "Build", description: "Next.js + Tailwind, iterative polish, feedback loops until it's right." },
    { step: "04", title: "Ship", description: "Deploy, handoff, and support — your site and systems go live and stay sharp." },
  ],
  contact: {
    email: "hello@suchgrime.com",
    phone: "+1-312-555-0199",
    note: "Currently accepting new projects",
    projectTypes: [
      "New Website",
      "Redesign",
      "Landing Page",
      "E-commerce",
      "Web App",
      "Business Automation",
      "Other",
    ],
  },
  navLinks: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Locations", href: "/locations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  sameAs: [
    "https://github.com/joetabora",
    "https://suchgrime.com",
  ],
  localBusiness: {
    address: {
      streetAddress: "Remote-first studio",
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60601",
      addressCountry: "US",
    },
    geo: { latitude: 41.8781, longitude: -87.6298 },
    priceRange: "$$",
  },
} as const

export type ServicePage = (typeof siteConfig.servicePages)[number]
export type WorkItem = (typeof siteConfig.work)[number]
