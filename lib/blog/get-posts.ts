import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogPostMeta } from "./types"
import {
  getAllPublishedBlogSlugs,
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/cms/content"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

function parseMeta(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString()),
    author: String(data.author ?? "SuchGrime"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    published: data.published !== false,
    content,
  }
}

export function getAllPostsFromFiles(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
      const { data } = matter(raw)
      const post = parseMeta(slug, data, "")
      const { content: _, ...meta } = post
      return meta
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getPostBySlugFromFiles(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const post = parseMeta(slug, data, content)
  if (!post.published) return null
  return post
}

function getAllSlugsFromFiles(): string[] {
  return getAllPostsFromFiles().map((p) => p.slug)
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const dbPosts = await getPublishedBlogPosts()
  if (dbPosts.length > 0) return dbPosts
  return getAllPostsFromFiles()
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const dbPost = await getPublishedBlogPostBySlug(slug)
  if (dbPost) return dbPost
  return getPostBySlugFromFiles(slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const dbSlugs = await getAllPublishedBlogSlugs()
  if (dbSlugs.length > 0) return dbSlugs
  return getAllSlugsFromFiles()
}
