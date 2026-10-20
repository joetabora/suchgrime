import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertBuild } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export const dynamic = "force-dynamic";

export default async function EditBuildPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const build = await prisma.build.findUnique({ where: { id } });
  if (!build) notFound();

  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">Edit Build</h1>
      <form action={upsertBuild} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <input type="hidden" name="id" value={build.id} />
        <Field label="Title" name="title" defaultValue={build.title} required />
        <Field label="Slug" name="slug" defaultValue={build.slug} />
        <Field label="Stage" name="stage" defaultValue={build.stage} required />
        <Field label="Builder" name="builder" defaultValue={build.builder} required />
        <Field label="Image URL" name="imageUrl" defaultValue={build.imageUrl} />
        <Field label="Excerpt" name="excerpt" defaultValue={build.excerpt} textarea required />
        <Field label="Body / journal" name="body" defaultValue={build.body} textarea rows={8} />
        <CheckboxField label="Published" name="published" defaultChecked={build.published} />
        <SubmitButton />
      </form>
    </div>
  );
}
