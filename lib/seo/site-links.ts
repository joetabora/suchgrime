/** Map pSEO service slugs to primary marketing pillar pages */
export const serviceMarketingPaths: Record<string, string> = {
  "custom-software": "/custom-software",
  "ai-automation": "/ai-automation",
  "web-development": "/web-design",
}

export function getServiceMarketingPath(slug: string): string {
  return serviceMarketingPaths[slug] ?? `/services/${slug}`
}

/**
 * Service slugs whose dedicated pillar page is the canonical SEO target.
 * Prevents the `/services/[slug]` pSEO page from cannibalizing the richer
 * marketing pillar for the same topic.
 */
export const serviceCanonicalOverrides: Record<string, string> = {
  "custom-software": "/custom-software",
  "ai-automation": "/ai-automation",
}

/** Top entities for footer and cross-linking — Wisconsin-first, then national */
export const footerCollections = [
  { label: "Custom Software", href: "/custom-software" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Web Design", href: "/web-design" },
  { label: "Services", href: "/services" },
  { label: "Wisconsin", href: "/wisconsin" },
  { label: "Locations", href: "/locations" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Software", href: "/software" },
  { label: "Resources", href: "/resources" },
  { label: "Glossary", href: "/glossary" },
  { label: "Blog", href: "/blog" },
  { label: "Solutions", href: "/solutions" },
] as const

export const footerTopLocations = [
  { label: "Milwaukee", href: "/locations/milwaukee" },
  { label: "Madison", href: "/locations/madison" },
  { label: "Green Bay", href: "/locations/green-bay" },
  { label: "Kenosha", href: "/locations/kenosha" },
  { label: "Racine", href: "/locations/racine" },
  { label: "All Wisconsin", href: "/wisconsin" },
] as const

export const footerTopIndustries = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Legal", href: "/industries/legal" },
  { label: "Home Services", href: "/industries/home-services" },
  { label: "E-commerce", href: "/industries/ecommerce" },
] as const

export const footerTopServices = [
  { label: "Custom Software", href: "/custom-software" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Web Design", href: "/web-design" },
] as const

/** Wisconsin cities for cross-linking blocks */
export const wisconsinHubLinks = [
  { label: "Milwaukee", href: "/locations/milwaukee" },
  { label: "Madison", href: "/locations/madison" },
  { label: "Green Bay", href: "/locations/green-bay" },
  { label: "Appleton", href: "/locations/appleton" },
  { label: "Kenosha", href: "/locations/kenosha" },
  { label: "Waukesha", href: "/locations/waukesha" },
] as const
