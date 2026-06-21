import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("services")
export const generateMetadata = createPseoDetailMetadata("services")
export default createPseoDetailPage("services")
