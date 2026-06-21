"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { MdxContent } from "@/components/blog/mdx-content"
import { AdminShell } from "@/components/cms/admin-shell"
import { FaqRepeater } from "@/components/cms/faq-repeater"
import { FeatureRepeater } from "@/components/cms/feature-repeater"
import {
  joinCommaList,
  parseCommaList,
  StringListField,
} from "@/components/cms/string-list-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CMS_COLLECTION_LABELS } from "@/lib/cms/collections"
import type { ContentEntry } from "@/lib/db/schema"
import type { PseoCollectionId } from "@/lib/pseo/types"

interface ContentFormProps {
  collection: PseoCollectionId
  entry?: ContentEntry
}

function emptyForm(collection: PseoCollectionId) {
  return {
    collection,
    slug: "",
    title: "",
    description: "",
    intro: "",
    headline: "",
    body: "",
    author: "SuchGrime",
    href: "",
    image: "",
    features: [] as string[],
    faqs: [] as { q: string; a: string }[],
    tagsText: "",
    keywordsText: "",
    date: new Date().toISOString().slice(0, 10),
    published: false,
  }
}

function entryToForm(entry: ContentEntry) {
  return {
    collection: entry.collection as PseoCollectionId,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    intro: entry.intro,
    headline: entry.headline ?? "",
    body: entry.body ?? "",
    author: entry.author ?? "SuchGrime",
    href: entry.href ?? "",
    image: entry.image ?? "",
    features: entry.features ?? [],
    faqs: entry.faqs ?? [],
    tagsText: joinCommaList(entry.tags),
    keywordsText: joinCommaList(entry.keywords),
    date: entry.date ?? new Date().toISOString().slice(0, 10),
    published: entry.published,
  }
}

export function ContentForm({ collection, entry }: ContentFormProps) {
  const router = useRouter()
  const isEdit = Boolean(entry)
  const [form, setForm] = useState(() => (entry ? entryToForm(entry) : emptyForm(collection)))
  const [tab, setTab] = useState<"edit" | "preview">("edit")
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const label = CMS_COLLECTION_LABELS[collection]
  const title = isEdit ? `Edit ${label}` : `New ${label}`

  const payload = useMemo(
    () => ({
      collection: form.collection,
      slug: form.slug,
      title: form.title,
      description: form.description,
      intro: form.intro,
      headline: form.headline || undefined,
      body: form.body || undefined,
      author: form.author || undefined,
      href: form.href || undefined,
      image: form.image || undefined,
      features: form.features.filter(Boolean),
      faqs: form.faqs.filter((f) => f.q && f.a),
      tags: parseCommaList(form.tagsText),
      keywords: parseCommaList(form.keywordsText),
      date: form.date || undefined,
      published: form.published,
    }),
    [form],
  )

  async function save(publish = false) {
    setSaving(true)
    setError(null)

    const data = { ...payload, published: publish ? true : payload.published }

    try {
      const response = isEdit
        ? await fetch(`/api/cms/content/${entry!.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
        : await fetch("/api/cms/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })

      const result = await response.json()
      if (!response.ok) {
        setError(typeof result.error === "string" ? result.error : "Save failed")
        return
      }

      if (publish && isEdit) {
        await fetch(`/api/cms/content/${entry!.id}/publish`, { method: "POST" })
      }

      router.push(`/admin/${collection}`)
      router.refresh()
    } catch {
      setError("Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!entry || !confirm("Delete this entry? This cannot be undone.")) return
    setSaving(true)
    setError(null)
    try {
      const response = await fetch(`/api/cms/content/${entry.id}`, { method: "DELETE" })
      if (!response.ok) {
        setError("Delete failed")
        return
      }
      router.push(`/admin/${collection}`)
      router.refresh()
    } catch {
      setError("Delete failed")
    } finally {
      setSaving(false)
    }
  }

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AdminShell title={title}>
      <div className="mx-auto max-w-4xl space-y-6">
        {error && (
          <div className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="my-page-slug"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="intro">Intro</Label>
          <Textarea
            id="intro"
            value={form.intro}
            onChange={(e) => setField("intro", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Headline (optional)</Label>
          <Input
            id="headline"
            value={form.headline}
            onChange={(e) => setField("headline", e.target.value)}
          />
        </div>

        {(collection === "case-studies" || collection === "software") && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="href">Demo link</Label>
              <Input
                id="href"
                value={form.href}
                onChange={(e) => setField("href", e.target.value)}
                placeholder="/work/parlor-desk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setField("image", e.target.value)}
              />
            </div>
          </div>
        )}

        {(collection === "blog" || collection === "resources") && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
              />
            </div>
            {collection === "blog" && (
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setField("author", e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        <StringListField
          label="Tags"
          value={form.tagsText}
          onChange={(v) => setField("tagsText", v)}
          placeholder="SEO, Performance, Next.js"
          hint="Comma-separated"
        />

        <StringListField
          label="Keywords"
          value={form.keywordsText}
          onChange={(v) => setField("keywordsText", v)}
          placeholder="web development, automation"
          hint="Comma-separated"
        />

        <FeatureRepeater
          label="Features"
          values={form.features}
          onChange={(values) => setField("features", values)}
          placeholder="Feature description"
        />

        <FaqRepeater values={form.faqs} onChange={(values) => setField("faqs", values)} />

        {(collection === "blog" || collection === "resources") && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={tab === "edit" ? "default" : "outline"}
                size="sm"
                onClick={() => setTab("edit")}
              >
                Edit body
              </Button>
              {collection === "blog" && (
                <Button
                  type="button"
                  variant={tab === "preview" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTab("preview")}
                >
                  Preview
                </Button>
              )}
            </div>
            {tab === "edit" ? (
              <Textarea
                value={form.body}
                onChange={(e) => setField("body", e.target.value)}
                className="min-h-[320px] font-mono text-sm"
                placeholder={collection === "blog" ? "MDX content..." : "Optional body text..."}
              />
            ) : (
              <div className="rounded border border-white/10 p-6">
                <MdxContent source={form.body || ""} />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <Button type="button" disabled={saving} onClick={() => save(false)}>
            {saving ? "Saving..." : "Save draft"}
          </Button>
          <Button type="button" disabled={saving} onClick={() => save(true)}>
            Publish
          </Button>
          {isEdit && (
            <Button type="button" variant="outline" disabled={saving} onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
