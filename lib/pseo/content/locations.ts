import type { LocationSeed } from "./location-helpers"
import { enrichLocation, WISCONSIN_SUBREGIONS } from "./location-helpers"
import nationalSeeds from "./data/locations.json"
import wisconsinSeeds from "./data/wisconsin-locations.json"
import type { PseoPage } from "../types"

const wiSlugs = new Set((wisconsinSeeds as LocationSeed[]).map((l) => l.slug))

/** National metros excluding WI cities that have dedicated Wisconsin entries */
const nationalOnly = (nationalSeeds as LocationSeed[]).filter((l) => !wiSlugs.has(l.slug))

const allSeeds: LocationSeed[] = [...(wisconsinSeeds as LocationSeed[]), ...nationalOnly]

/** 51 national metros + 35 Wisconsin cities (Milwaukee deduped to WI-enriched version) */
export const locations: PseoPage[] = allSeeds.map(enrichLocation)

export function getLocationBySlug(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function getLocationsByRegion(region: string) {
  return allSeeds.filter((l) => l.region === region).map(enrichLocation)
}

export function getWisconsinLocations(): PseoPage[] {
  return locations.filter((l) => l.tags?.includes("Wisconsin"))
}

export function getWisconsinLocationsBySubregion(subregion: string): PseoPage[] {
  return getWisconsinLocations().filter((l) => l.tags?.includes(subregion))
}

export { WISCONSIN_SUBREGIONS }
