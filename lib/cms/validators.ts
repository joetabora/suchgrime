import { z } from "zod"
import { isCmsCollection } from "./collections"

export const faqSchema = z.object({
  q: z.string().min(1, "Question is required"),
  a: z.string().min(1, "Answer is required"),
})

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only")

export const contentEntrySchema = z.object({
  collection: z.string().refine(isCmsCollection, "Invalid collection"),
  slug: slugSchema,
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  intro: z.string().min(1, "Intro is required"),
  headline: z.string().optional(),
  body: z.string().optional(),
  author: z.string().optional(),
  href: z.string().optional(),
  image: z.string().optional(),
  features: z.array(z.string()).default([]),
  faqs: z.array(faqSchema).default([]),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  date: z.string().optional(),
  published: z.boolean().default(false),
})

export const contentEntryUpdateSchema = contentEntrySchema.partial().omit({ collection: true })

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type ContentEntryInput = z.infer<typeof contentEntrySchema>
export type ContentEntryUpdate = z.infer<typeof contentEntryUpdateSchema>

export function validateContentForCollection(
  data: ContentEntryInput,
): { success: true } | { success: false; error: string } {
  if (data.collection === "blog") {
    if (!data.body?.trim()) return { success: false, error: "Blog posts require MDX body content" }
    if (!data.author?.trim()) return { success: false, error: "Blog posts require an author" }
    if (!data.date?.trim()) return { success: false, error: "Blog posts require a date" }
  }
  return { success: true }
}
