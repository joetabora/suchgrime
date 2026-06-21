import {
  createPseoMatrixMetadata,
  createPseoMatrixPage,
  createPseoMatrixStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoMatrixStaticParams("industries")
export const generateMetadata = createPseoMatrixMetadata("industries")
export default createPseoMatrixPage("industries")
