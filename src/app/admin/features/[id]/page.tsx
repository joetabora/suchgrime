import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertFeature } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export const dynamic = "force-dynamic";

export default async function EditFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = await prisma.feature.findUnique({ where: { id } });
  if (!feature) notFound();

  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">Edit Feature</h1>
      <form action={upsertFeature} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <input type="hidden" name="id" value={feature.id} />
        <Field label="Title" name="title" defaultValue={feature.title} required />
        <Field label="Slug" name="slug" defaultValue={feature.slug} />
        <Field label="Type" name="type" defaultValue={feature.type} required />
        <Field label="Location" name="location" defaultValue={feature.location} />
        <Field label="Image URL" name="imageUrl" defaultValue={feature.imageUrl} />
        <Field label="Excerpt" name="excerpt" defaultValue={feature.excerpt} textarea required />
        <Field label="Body" name="body" defaultValue={feature.body} textarea rows={8} />
        <CheckboxField label="Published" name="published" defaultChecked={feature.published} />
        <SubmitButton />
      </form>
    </div>
  );
}
