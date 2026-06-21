import { and, desc, eq, ilike, or } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { contentEntries, type ContentEntry, type NewContentEntry } from "@/lib/db/schema"
import type { PseoCollectionId } from "@/lib/pseo/types"
import { entryToPseoPage, entryToBlogPost, entryToBlogMeta } from "./mapper"
import { revalidateContentEntry } from "./revalidate"
import { pingIndexNow, urlsForContentEntry } from "./indexnow"
import type { ContentEntryInput, ContentEntryUpdate } from "./validators"

export async function listEntries(
  collection: PseoCollectionId,
  options?: { publishedOnly?: boolean; search?: string },
): Promise<ContentEntry[]> {
  const db = getDb()
  if (!db) return []

  const conditions = [eq(contentEntries.collection, collection)]
  if (options?.publishedOnly) {
    conditions.push(eq(contentEntries.published, true))
  }
  if (options?.search) {
    const term = `%${options.search}%`
    conditions.push(or(ilike(contentEntries.title, term), ilike(contentEntries.slug, term))!)
  }

  return db
    .select()
    .from(contentEntries)
    .where(and(...conditions))
    .orderBy(desc(contentEntries.updatedAt))
}

export async function countPublishedEntries(collection: PseoCollectionId): Promise<number> {
  const db = getDb()
  if (!db) return 0
  const rows = await db
    .select()
    .from(contentEntries)
    .where(and(eq(contentEntries.collection, collection), eq(contentEntries.published, true)))
  return rows.length
}

export async function getEntryById(id: number): Promise<ContentEntry | null> {
  const db = getDb()
  if (!db) return null
  const rows = await db.select().from(contentEntries).where(eq(contentEntries.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getEntryBySlug(
  collection: PseoCollectionId,
  slug: string,
): Promise<ContentEntry | null> {
  const db = getDb()
  if (!db) return null
  const rows = await db
    .select()
    .from(contentEntries)
    .where(and(eq(contentEntries.collection, collection), eq(contentEntries.slug, slug)))
    .limit(1)
  return rows[0] ?? null
}

export async function createEntry(input: ContentEntryInput): Promise<ContentEntry | null> {
  const db = getDb()
  if (!db) return null

  const now = new Date()
  const values: NewContentEntry = {
    ...input,
    features: input.features ?? [],
    faqs: input.faqs ?? [],
    tags: input.tags ?? [],
    keywords: input.keywords ?? [],
    published: input.published ?? false,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.published ? now : null,
  }

  const rows = await db.insert(contentEntries).values(values).returning()
  const entry = rows[0]
  if (entry?.published) {
    revalidateContentEntry(input.collection as PseoCollectionId, entry.slug)
    void pingIndexNow(urlsForContentEntry(input.collection, entry.slug))
  }
  return entry ?? null
}

export async function updateEntry(
  id: number,
  input: ContentEntryUpdate,
): Promise<ContentEntry | null> {
  const db = getDb()
  if (!db) return null

  const existing = await getEntryById(id)
  if (!existing) return null

  const now = new Date()
  const rows = await db
    .update(contentEntries)
    .set({
      ...input,
      updatedAt: now,
      publishedAt:
        input.published === true
          ? existing.publishedAt ?? now
          : input.published === false
            ? null
            : existing.publishedAt,
    })
    .where(eq(contentEntries.id, id))
    .returning()

  const entry = rows[0]
  if (entry) {
    revalidateContentEntry(existing.collection as PseoCollectionId, entry.slug)
    if (existing.slug !== entry.slug) {
      revalidateContentEntry(existing.collection as PseoCollectionId, existing.slug)
    }
  }
  return entry ?? null
}

export async function deleteEntry(id: number): Promise<boolean> {
  const db = getDb()
  if (!db) return false

  const existing = await getEntryById(id)
  if (!existing) return false

  await db.delete(contentEntries).where(eq(contentEntries.id, id))
  revalidateContentEntry(existing.collection as PseoCollectionId, existing.slug)
  return true
}

export async function publishEntry(id: number): Promise<ContentEntry | null> {
  const db = getDb()
  if (!db) return null

  const existing = await getEntryById(id)
  if (!existing) return null

  const now = new Date()
  const rows = await db
    .update(contentEntries)
    .set({ published: true, publishedAt: now, updatedAt: now })
    .where(eq(contentEntries.id, id))
    .returning()

  const entry = rows[0]
  if (entry) {
    revalidateContentEntry(entry.collection as PseoCollectionId, entry.slug)
    if (entry.published) {
      void pingIndexNow(urlsForContentEntry(entry.collection, entry.slug))
    }
  }
  return entry ?? null
}

export async function getPublishedPseoPages(collection: Exclude<PseoCollectionId, "blog">) {
  const entries = await listEntries(collection, { publishedOnly: true })
  return entries.map(entryToPseoPage)
}

export async function getPublishedBlogPosts() {
  const entries = await listEntries("blog", { publishedOnly: true })
  return entries
    .map(entryToBlogMeta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const entry = await getEntryBySlug("blog", slug)
  if (!entry || !entry.published) return null
  return entryToBlogPost(entry)
}

export async function getAllPublishedBlogSlugs() {
  const posts = await getPublishedBlogPosts()
  return posts.map((p) => p.slug)
}

export async function getAllPublishedEntriesForAdmin(collection: PseoCollectionId) {
  return listEntries(collection)
}
