import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { and, eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { contentEntries } from "@/lib/db/schema"
import { locations } from "@/lib/pseo/content/locations"
import { industries } from "@/lib/pseo/content/industries"
import { services } from "@/lib/pseo/content/services"
import { caseStudies } from "@/lib/pseo/content/case-studies"
import { softwareProducts } from "@/lib/pseo/content/software"
import { resources } from "@/lib/pseo/content/resources"
import { glossaryTerms } from "@/lib/pseo/content/glossary"
import { pseoPageToEntryInput } from "./mapper"
import type { PseoCollectionId } from "@/lib/pseo/types"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

const STATIC_COLLECTIONS: Array<{
  collection: Exclude<PseoCollectionId, "blog">
  pages: typeof locations
}> = [
  { collection: "locations", pages: locations },
  { collection: "industries", pages: industries },
  { collection: "services", pages: services },
  { collection: "case-studies", pages: caseStudies },
  { collection: "software", pages: softwareProducts },
  { collection: "resources", pages: resources },
  { collection: "glossary", pages: glossaryTerms },
]

async function upsertEntry(input: ReturnType<typeof pseoPageToEntryInput>) {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured")

  const now = new Date()
  const existing = await db
    .select()
    .from(contentEntries)
    .where(and(eq(contentEntries.collection, input.collection), eq(contentEntries.slug, input.slug)))
    .limit(1)

  const row = existing[0]

  if (row) {
    await db
      .update(contentEntries)
      .set({
        title: input.title,
        description: input.description,
        intro: input.intro,
        headline: input.headline ?? null,
        body: input.body ?? null,
        author: input.author ?? null,
        href: input.href ?? null,
        image: input.image ?? null,
        features: input.features,
        faqs: input.faqs,
        tags: input.tags,
        keywords: input.keywords,
        date: input.date ?? null,
        published: input.published,
        updatedAt: now,
        publishedAt: input.published ? row.publishedAt ?? now : null,
      })
      .where(eq(contentEntries.id, row.id))
    return "updated"
  }

  await db.insert(contentEntries).values({
    ...input,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.published ? now : null,
  })
  return "created"
}

export async function seedCmsContent() {
  const db = getDb()
  if (!db) throw new Error("DATABASE_URL is not configured")

  let created = 0
  let updated = 0

  for (const { collection, pages } of STATIC_COLLECTIONS) {
    for (const page of pages) {
      const result = await upsertEntry(pseoPageToEntryInput(page, collection))
      if (result === "created") created++
      else updated++
    }
  }

  if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
    for (const filename of files) {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
      const { data, content } = matter(raw)

      const input = pseoPageToEntryInput(
        {
          slug,
          title: String(data.title ?? slug),
          description: String(data.description ?? ""),
          intro: String(data.description ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          date: String(data.date ?? new Date().toISOString()),
          published: data.published !== false,
          image: data.image ? String(data.image) : undefined,
        },
        "blog",
        {
          author: String(data.author ?? "SuchGrime"),
          body: content,
        },
      )

      const result = await upsertEntry(input)
      if (result === "created") created++
      else updated++
    }
  }

  return { created, updated }
}
