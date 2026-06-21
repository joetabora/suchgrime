import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("software")
export const generateMetadata = createPseoDetailMetadata("software")
export default createPseoDetailPage("software")
