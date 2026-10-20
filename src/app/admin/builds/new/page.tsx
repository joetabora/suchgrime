import { upsertBuild } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export default function NewBuildPage() {
  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">New Build</h1>
      <form action={upsertBuild} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <Field label="Title" name="title" required />
        <Field label="Slug (optional)" name="slug" />
        <Field label="Stage" name="stage" defaultValue="Tear Down" required />
        <Field label="Builder" name="builder" required />
        <Field label="Image URL" name="imageUrl" />
        <Field label="Excerpt" name="excerpt" textarea required />
        <Field label="Body / journal" name="body" textarea rows={8} />
        <CheckboxField label="Published" name="published" defaultChecked />
        <SubmitButton />
      </form>
    </div>
  );
}
