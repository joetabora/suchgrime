import type { ContentEntry } from "@/lib/db/schema"
import type { BlogPost, BlogPostMeta } from "@/lib/blog/types"
import type { PseoPage } from "@/lib/pseo/types"

function orEmpty<T>(value: T[] | null | undefined): T[] {
  return value ?? []
}

export function entryToPseoPage(entry: ContentEntry): PseoPage {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    headline: entry.headline ?? undefined,
    intro: entry.intro,
    body: entry.body ?? undefined,
    features: orEmpty(entry.features),
    faqs: orEmpty(entry.faqs),
    tags: orEmpty(entry.tags),
    keywords: orEmpty(entry.keywords),
    href: entry.href ?? undefined,
    image: entry.image ?? undefined,
    date: entry.date ?? undefined,
    published: entry.published,
    lastModified: entry.updatedAt.toISOString(),
  }
}

export function entryToBlogPost(entry: ContentEntry): BlogPost {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    date: entry.date ?? new Date().toISOString(),
    author: entry.author ?? "SuchGrime",
    tags: orEmpty(entry.tags),
    image: entry.image ?? undefined,
    published: entry.published,
    content: entry.body ?? "",
  }
}

export function entryToBlogMeta(entry: ContentEntry): BlogPostMeta {
  const { content: _, ...meta } = entryToBlogPost(entry)
  return meta
}

export function pseoPageToEntryInput(
  page: PseoPage,
  collection: string,
  extras?: { author?: string; body?: string },
) {
  return {
    collection,
    slug: page.slug,
    title: page.title,
    description: page.description,
    intro: page.intro,
    headline: page.headline,
    body: extras?.body ?? page.body,
    author: extras?.author,
    href: page.href,
    image: page.image,
    features: page.features ?? [],
    faqs: page.faqs ?? [],
    tags: page.tags ?? [],
    keywords: page.keywords ?? [],
    date: page.date,
    published: page.published !== false,
  }
}
