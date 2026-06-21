import {
  createPseoDetailMetadata,
  createPseoDetailPage,
  createPseoDetailStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoDetailStaticParams("case-studies")
export const generateMetadata = createPseoDetailMetadata("case-studies")
export default createPseoDetailPage("case-studies")
