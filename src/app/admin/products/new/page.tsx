import { upsertProduct } from "../../actions";
import { SubmitButton } from "@/components/admin/AdminFormFields";
import { ProductFormFields } from "@/components/admin/ProductFormFields";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">New Product</h1>
      <form action={upsertProduct} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <ProductFormFields />
        <SubmitButton />
      </form>
    </div>
  );
}
