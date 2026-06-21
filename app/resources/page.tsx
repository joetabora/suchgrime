import {
  createPseoIndexMetadata,
  createPseoIndexPage,
} from "@/lib/pseo/factory"

export const metadata = createPseoIndexMetadata("resources")
export default createPseoIndexPage("resources")
