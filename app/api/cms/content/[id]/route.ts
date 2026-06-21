import { NextResponse } from "next/server"
import { requireSession } from "@/lib/cms/auth"
import { isCmsCollection } from "@/lib/cms/collections"
import { deleteEntry, getEntryById, updateEntry } from "@/lib/cms/content"
import { contentEntryUpdateSchema, validateContentForCollection } from "@/lib/cms/validators"
import type { ContentEntryInput } from "@/lib/cms/validators"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireSession()
    const { id } = await context.params
    const entryId = Number(id)
    if (Number.isNaN(entryId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    const entry = await getEntryById(entryId)
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ entry })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PATCH(request: Request, context: RouteContext) {
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

    const body = await request.json()
    const parsed = contentEntryUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const merged: ContentEntryInput = {
      collection: existing.collection,
      slug: parsed.data.slug ?? existing.slug,
      title: parsed.data.title ?? existing.title,
      description: parsed.data.description ?? existing.description,
      intro: parsed.data.intro ?? existing.intro,
      headline: parsed.data.headline ?? existing.headline ?? undefined,
      body: parsed.data.body ?? existing.body ?? undefined,
      author: parsed.data.author ?? existing.author ?? undefined,
      href: parsed.data.href ?? existing.href ?? undefined,
      image: parsed.data.image ?? existing.image ?? undefined,
      features: parsed.data.features ?? existing.features ?? [],
      faqs: parsed.data.faqs ?? existing.faqs ?? [],
      tags: parsed.data.tags ?? existing.tags ?? [],
      keywords: parsed.data.keywords ?? existing.keywords ?? [],
      date: parsed.data.date ?? existing.date ?? undefined,
      published: parsed.data.published ?? existing.published,
    }

    const validation = validateContentForCollection(merged)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const entry = await updateEntry(entryId, parsed.data)
    if (!entry) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 })
    }

    return NextResponse.json({ entry })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to update entry" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireSession()
    const { id } = await context.params
    const entryId = Number(id)
    if (Number.isNaN(entryId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    const deleted = await deleteEntry(entryId)
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
