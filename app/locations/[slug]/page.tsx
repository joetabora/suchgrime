import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("locations")
export const generateMetadata = createPseoDetailMetadata("locations")
export default createPseoDetailPage("locations")
