import type { PseoCollectionId } from "@/lib/pseo/types"

export const CMS_COLLECTIONS: PseoCollectionId[] = [
  "locations",
  "industries",
  "services",
  "case-studies",
  "software",
  "resources",
  "blog",
]

export function isCmsCollection(value: string): value is PseoCollectionId {
  return CMS_COLLECTIONS.includes(value as PseoCollectionId)
}

export const CMS_COLLECTION_LABELS: Record<PseoCollectionId, string> = {
  locations: "Locations",
  industries: "Industries",
  services: "Services",
  "case-studies": "Case Studies",
  software: "Software",
  resources: "Resources",
  blog: "Blog",
}
