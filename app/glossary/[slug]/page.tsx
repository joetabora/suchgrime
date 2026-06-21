import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export { pseoRevalidate as revalidate } from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("glossary")
export const generateMetadata = createPseoDetailMetadata("glossary")
export default createPseoDetailPage("glossary")
