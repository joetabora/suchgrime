import {
  createPseoIndexMetadata,
  createPseoIndexPage,
} from "@/lib/pseo/factory"

export { pseoRevalidate as revalidate } from "@/lib/pseo/factory"

export const metadata = createPseoIndexMetadata("glossary")
export default createPseoIndexPage("glossary")
