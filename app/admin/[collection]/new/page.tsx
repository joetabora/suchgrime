import { notFound } from "next/navigation"
import { ContentForm } from "@/components/cms/content-form"
import { isCmsCollection } from "@/lib/cms/collections"

interface Props {
  params: Promise<{ collection: string }>
}

export default async function AdminNewContentPage({ params }: Props) {
  const { collection } = await params
  if (!isCmsCollection(collection)) notFound()

  return <ContentForm collection={collection} />
}
