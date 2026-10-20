import { upsertEvent } from "../../actions";
import { CheckboxField, Field, SubmitButton } from "@/components/admin/AdminFormFields";

export default function NewEventPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="mb-8 font-bebas text-5xl tracking-tight text-white">New Event</h1>
      <form action={upsertEvent} className="max-w-2xl space-y-6 border border-white/10 bg-brand-graphite p-8">
        <Field label="Title" name="title" required />
        <Field label="Slug (optional)" name="slug" />
        <Field label="Location" name="location" required />
        <Field label="Date" name="eventDate" type="date" defaultValue={today} required />
        <Field label="Status" name="status" defaultValue="Upcoming" required />
        <Field label="Image URL" name="imageUrl" />
        <Field label="Description" name="description" textarea />
        <CheckboxField label="Published" name="published" defaultChecked />
        <SubmitButton />
      </form>
    </div>
  );
}
