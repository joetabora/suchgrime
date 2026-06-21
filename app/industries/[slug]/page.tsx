import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("industries")
export const generateMetadata = createPseoDetailMetadata("industries")
export default createPseoDetailPage("industries")
