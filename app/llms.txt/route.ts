import { siteConfig } from "@/lib/site-config"
import { getSiteUrl } from "@/lib/utils"

export async function GET() {
  const base = getSiteUrl()
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Primary pages
- ${base}/
- ${base}/services
- ${base}/locations
- ${base}/industries
- ${base}/case-studies
- ${base}/software
- ${base}/resources
- ${base}/glossary
- ${base}/blog
- ${base}/solutions
- ${base}/contact

## Content types
- Programmatic SEO: locations × services and industries × services matrix pages
- CMS-managed blog, case studies, and resources
- Glossary of web development and SEO terms

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
