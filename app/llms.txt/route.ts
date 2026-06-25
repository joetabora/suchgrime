import { siteConfig } from "@/lib/site-config"
import { getSiteUrl } from "@/lib/utils"

export async function GET() {
  const base = getSiteUrl()
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Primary pages
- ${base}/
- ${base}/about
- ${base}/custom-software
- ${base}/ai-automation
- ${base}/web-design
- ${base}/wisconsin
- ${base}/services
- ${base}/locations
- ${base}/industries
- ${base}/case-studies
- ${base}/work
- ${base}/software
- ${base}/resources
- ${base}/glossary
- ${base}/blog
- ${base}/solutions
- ${base}/contact

## Primary service area
Wisconsin (headquartered in Milwaukee). National location pages also available.

## Core services
- Custom Business Applications
- AI & Automation
- Professional Websites & Web Applications
- E-commerce & Booking Systems

## Content types
- Programmatic SEO: locations × services and industries × services matrix pages (5 services)
- CMS-managed blog, case studies, and resources
- Glossary of web development, software, and SEO terms

## Contact
- ${siteConfig.contact.email}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  })
}
