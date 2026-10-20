import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertProduct } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">Edit Product</h1>
      <form action={upsertProduct} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <input type="hidden" name="id" value={product.id} />
        <Field label="Title" name="title" defaultValue={product.title} required />
        <Field label="Slug" name="slug" defaultValue={product.slug} />
        <Field label="Category" name="category" defaultValue={product.category} required />
        <Field
          label="Price (USD)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={(product.priceCents / 100).toFixed(2)}
          required
        />
        <Field label="Inventory" name="inventory" type="number" min="0" defaultValue={product.inventory} required />
        <Field label="Status" name="status" defaultValue={product.status} required />
        <Field label="Image URL" name="imageUrl" defaultValue={product.imageUrl} />
        <Field label="Description" name="description" defaultValue={product.description} textarea required />
        <CheckboxField label="Active (visible in shop)" name="active" defaultChecked={product.active} />
        <SubmitButton />
      </form>
    </div>
  );
}
