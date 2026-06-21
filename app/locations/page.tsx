import {
  createPseoIndexMetadata,
  createPseoIndexPage,
} from "@/lib/pseo/factory"

export const metadata = createPseoIndexMetadata("locations")
export default createPseoIndexPage("locations")
