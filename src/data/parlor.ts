export const parlor = {
  name: "SuchGrime",
  subtitle: "Web Parlor",
  domain: "suchgrime.com",
  tagline: "We build sites with soul and grit.",
  heroHeadline: "URBAN WEB CRAFT FOR BRANDS THAT DON'T DO BORING",
  heroSubtext:
    "SuchGrime Web Parlor is an inner-city studio crafting bold, fast, accessible websites for brands that want edge without sacrificing polish.",
  about: {
    story:
      "We started as builders tired of cookie-cutter templates and safe design. SuchGrime is a creative shop rooted in urban culture — we bring that same raw energy to every pixel, every interaction, every launch. Local brands, startups, and businesses that refuse to blend in — that's our lane.",
    stats: [
      { label: "Approach", value: "Full-Stack Ready" },
      { label: "Standard", value: "Mobile-First" },
      { label: "Focus", value: "Performance" },
      { label: "Built-In", value: "A11y" },
    ],
  },
  marqueePhrases: [
    "REACT",
    "TAILWIND",
    "VITE",
    "MOTION",
    "UI/UX",
    "RESPONSIVE",
    "ACCESSIBLE",
    "FAST",
    "TYPESCRIPT",
    "DEPLOY",
  ],
  serviceGroups: [
    {
      title: "Design & Frontend",
      items: [
        { name: "Custom React Websites", description: "Single-page apps and multi-route experiences built for your brand." },
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
        { name: "CMS & Headless Content", description: "Content models and headless CMS setup when you need it." },
      ],
    },
    {
      title: "Launch & Quality",
      items: [
        { name: "Performance Optimization", description: "Core Web Vitals, lazy loading, and bundle tuning." },
        { name: "SEO Fundamentals", description: "Semantic HTML, meta tags, and crawl-friendly structure." },
        { name: "Accessibility", description: "WCAG-minded patterns, keyboard nav, and screen reader support." },
        { name: "Deployment", description: "Vercel, Netlify, or custom hosting — production-ready handoff." },
        { name: "Git & CI-Ready Structure", description: "Clean repos, linting, and workflows your team can extend." },
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
      kind: "app",
    },
    {
      slug: "coming-soon-3",
      title: "Fresh Fade",
      description: "More work from the parlor — soon.",
      image: "",
      tags: ["Coming Soon"],
      live: false,
      href: "",
    },
  ],
  process: [
    { step: "01", title: "Discover", description: "Goals, audience, vibe — we dig into what makes your brand tick." },
    { step: "02", title: "Design", description: "Layout, typography, motion direction — the blueprint takes shape." },
    { step: "03", title: "Build", description: "React + Tailwind, iterative polish, feedback loops until it's right." },
    { step: "04", title: "Ship", description: "Deploy, handoff, and support — your site goes live and stays sharp." },
  ],
  contact: {
    email: "hello@suchgrime.com",
    note: "Currently accepting new projects",
    projectTypes: [
      "New Website",
      "Redesign",
      "Landing Page",
      "E-commerce",
      "Web App",
      "Other",
    ],
  },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
} as const
