import { getSiteUrl } from "@/lib/utils"
import type { BlogPostMeta } from "@/lib/blog/types"

export function articleSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SuchGrime",
      logo: { "@type": "ImageObject", url: `${getSiteUrl()}/favicon.svg` },
    },
    mainEntityOfPage: `${getSiteUrl()}/blog/${post.slug}`,
    ...(post.image && { image: post.image }),
  }
}
