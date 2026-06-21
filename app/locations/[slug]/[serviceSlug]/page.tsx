import {
  createPseoMatrixMetadata,
  createPseoMatrixPage,
  createPseoMatrixStaticParams,
} from "@/lib/pseo/factory"

export const generateStaticParams = createPseoMatrixStaticParams("locations")
export const generateMetadata = createPseoMatrixMetadata("locations")
export default createPseoMatrixPage("locations")
