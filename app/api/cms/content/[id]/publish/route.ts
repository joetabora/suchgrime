import { NextResponse } from "next/server"
import { requireSession } from "@/lib/cms/auth"
import { isCmsCollection } from "@/lib/cms/collections"
import { getEntryById, publishEntry } from "@/lib/cms/content"
import { validateContentForCollection } from "@/lib/cms/validators"
import type { ContentEntryInput } from "@/lib/cms/validators"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function POST(_request: Request, context: RouteContext) {
  try {
    await requireSession()
    const { id } = await context.params
    const entryId = Number(id)
    if (Number.isNaN(entryId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    const existing = await getEntryById(entryId)
    if (!existing || !isCmsCollection(existing.collection)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const merged: ContentEntryInput = {
      collection: existing.collection,
      slug: existing.slug,
      title: existing.title,
      description: existing.description,
      intro: existing.intro,
      headline: existing.headline ?? undefined,
      body: existing.body ?? undefined,
      author: existing.author ?? undefined,
      href: existing.href ?? undefined,
      image: existing.image ?? undefined,
      features: existing.features ?? [],
      faqs: existing.faqs ?? [],
      tags: existing.tags ?? [],
      keywords: existing.keywords ?? [],
      date: existing.date ?? undefined,
      published: true,
    }

    const validation = validateContentForCollection(merged)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const entry = await publishEntry(entryId)
    if (!entry) {
      return NextResponse.json({ error: "Publish failed" }, { status: 500 })
    }

    return NextResponse.json({ entry })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to publish entry" }, { status: 500 })
  }
}
