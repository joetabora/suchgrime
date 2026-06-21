import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("resources")
export const generateMetadata = createPseoDetailMetadata("resources")
export default createPseoDetailPage("resources")
