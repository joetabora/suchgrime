import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { upsertEvent } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">Edit Event</h1>
      <form action={upsertEvent} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <input type="hidden" name="id" value={event.id} />
        <Field label="Title" name="title" defaultValue={event.title} required />
        <Field label="Slug" name="slug" defaultValue={event.slug} />
        <Field label="Location" name="location" defaultValue={event.location} required />
        <Field
          label="Date"
          name="eventDate"
          type="date"
          defaultValue={event.eventDate.toISOString().slice(0, 10)}
          required
        />
        <Field label="Status" name="status" defaultValue={event.status} required />
        <Field label="Image URL" name="imageUrl" defaultValue={event.imageUrl} />
        <Field label="Description" name="description" defaultValue={event.description} textarea />
        <CheckboxField label="Published" name="published" defaultChecked={event.published} />
        <SubmitButton />
      </form>
    </div>
  );
}
