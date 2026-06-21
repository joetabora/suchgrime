import type { LocationSeed } from "./location-helpers"
import { enrichLocation } from "./location-helpers"
import locationSeeds from "./data/locations.json"
import type { PseoPage } from "../types"

/** 52 US metros — import from JSON, enrich with body/FAQs for SEO depth */
export const locations: PseoPage[] = (locationSeeds as LocationSeed[]).map(enrichLocation)

export function getLocationBySlug(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function getLocationsByRegion(region: string) {
  return (locationSeeds as LocationSeed[]).filter((l) => l.region === region)
}
