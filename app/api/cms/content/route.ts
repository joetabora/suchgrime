import { NextResponse } from "next/server"
import { requireSession } from "@/lib/cms/auth"
import { isCmsCollection } from "@/lib/cms/collections"
import { createEntry, listEntries } from "@/lib/cms/content"
import { contentEntrySchema, validateContentForCollection } from "@/lib/cms/validators"

export async function GET(request: Request) {
  try {
    await requireSession()
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get("collection")
    const search = searchParams.get("search") ?? undefined

    if (!collection || !isCmsCollection(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
    }

    const entries = await listEntries(collection, { search })
    return NextResponse.json({ entries })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    await requireSession()
    const body = await request.json()
    const parsed = contentEntrySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const validation = validateContentForCollection(parsed.data)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const entry = await createEntry(parsed.data)
    if (!entry) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
    }

    return NextResponse.json({ entry }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 })
  }
}
