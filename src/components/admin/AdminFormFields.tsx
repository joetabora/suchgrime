export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  textarea,
  rows = 4,
  step,
  min,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  step?: string;
  min?: string | number;
}) {
  const className =
    "w-full border border-white/10 bg-brand-black p-3 text-white outline-none focus:border-brand-rust";

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block font-mono text-xs uppercase tracking-widest text-brand-chrome">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue ?? ""}
          step={step}
          min={min}
          className={className}
        />
      )}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-brand-rust"
      />
      {label}
    </label>
  );
}

export function SubmitButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="bg-brand-rust px-8 py-3 font-oswald text-xl uppercase tracking-wider text-white hover:bg-white hover:text-brand-black"
    >
      {label}
    </button>
  );
}
