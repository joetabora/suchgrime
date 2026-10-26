import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertProduct } from "../../actions";
import { SubmitButton } from "@/components/admin/AdminFormFields";
import { ProductFormFields } from "@/components/admin/ProductFormFields";

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
        <ProductFormFields product={product} />
        <SubmitButton />
      </form>
    </div>
  );
}
