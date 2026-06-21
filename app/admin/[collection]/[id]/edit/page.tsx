import { notFound } from "next/navigation"
import { ContentForm } from "@/components/cms/content-form"
import { isCmsCollection } from "@/lib/cms/collections"
import { getEntryById } from "@/lib/cms/content"

interface Props {
  params: Promise<{ collection: string; id: string }>
}

export default async function AdminEditContentPage({ params }: Props) {
  const { collection, id } = await params
  if (!isCmsCollection(collection)) notFound()

  const entryId = Number(id)
  if (Number.isNaN(entryId)) notFound()

  const entry = await getEntryById(entryId)
  if (!entry || entry.collection !== collection) notFound()

  return <ContentForm collection={collection} entry={entry} />
}
