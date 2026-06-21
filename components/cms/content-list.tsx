"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { AdminShell } from "@/components/cms/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CMS_COLLECTION_LABELS } from "@/lib/cms/collections"
import type { ContentEntry } from "@/lib/db/schema"
import type { PseoCollectionId } from "@/lib/pseo/types"

interface ContentListProps {
  collection: PseoCollectionId
  entries: ContentEntry[]
}

export function ContentList({ collection, entries }: ContentListProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  const label = CMS_COLLECTION_LABELS[collection]

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (filter === "published" && !entry.published) return false
      if (filter === "draft" && entry.published) return false
      if (!search) return true
      const term = search.toLowerCase()
      return (
        entry.title.toLowerCase().includes(term) || entry.slug.toLowerCase().includes(term)
      )
    })
  }, [entries, filter, search])

  return (
    <AdminShell
      title={label}
      action={
        <Button asChild>
          <Link href={`/admin/${collection}/new`}>New {label.slice(0, -1)}</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug..."
            className="max-w-sm"
          />
          <div className="flex gap-2">
            {(["all", "published", "draft"] as const).map((value) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={filter === value ? "default" : "outline"}
                onClick={() => setFilter(value)}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No entries found.
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr key={entry.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">{entry.title}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">{entry.slug}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          entry.published
                            ? "text-parlor-accent"
                            : "text-muted"
                        }
                      >
                        {entry.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(entry.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/${collection}/${entry.id}/edit`}
                        className="text-parlor-accent hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
