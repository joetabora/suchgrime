import { notFound } from "next/navigation"
import { ContentList } from "@/components/cms/content-list"
import { isCmsCollection } from "@/lib/cms/collections"
import { listEntries } from "@/lib/cms/content"

interface Props {
  params: Promise<{ collection: string }>
}

export default async function AdminCollectionPage({ params }: Props) {
  const { collection } = await params
  if (!isCmsCollection(collection)) notFound()

  const entries = await listEntries(collection)

  return <ContentList collection={collection} entries={entries} />
}
