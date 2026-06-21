import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost, BlogPostMeta } from "./types"

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

export function getAllPosts(): BlogPostMeta[] {
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

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const post = parseMeta(slug, data, content)
  if (!post.published) return null
  return post
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}
