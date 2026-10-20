import { upsertProduct } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">New Product</h1>
      <form action={upsertProduct} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <Field label="Title" name="title" required />
        <Field label="Slug (optional)" name="slug" />
        <Field label="Category" name="category" defaultValue="Apparel" required />
        <Field label="Price (USD)" name="price" type="number" step="0.01" min="0" defaultValue="35" required />
        <Field label="Inventory" name="inventory" type="number" min="0" defaultValue="10" required />
        <Field label="Status" name="status" defaultValue="available" required />
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
          Status: available · coming_soon · sold_out
        </p>
        <Field label="Image URL" name="imageUrl" />
        <Field label="Description" name="description" textarea required />
        <CheckboxField label="Active (visible in shop)" name="active" defaultChecked />
        <SubmitButton />
      </form>
    </div>
  );
}
