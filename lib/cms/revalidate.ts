import { revalidatePath } from "next/cache"
import type { PseoCollectionId } from "@/lib/pseo/types"
import { getCollectionConfig } from "@/lib/pseo/registry"

export function revalidateContentEntry(collection: PseoCollectionId, slug: string) {
  const config = getCollectionConfig(collection)
  revalidatePath(config.path)
  revalidatePath(`${config.path}/${slug}`)

  if (collection === "blog") {
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/feed.xml")
  }
}

export function revalidateCollection(collection: PseoCollectionId) {
  const config = getCollectionConfig(collection)
  revalidatePath(config.path)
  if (collection === "blog") {
    revalidatePath("/blog")
    revalidatePath("/feed.xml")
  }
}
