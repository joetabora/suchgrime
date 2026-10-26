import type { Product } from "@prisma/client";
import { CheckboxField, Field } from "@/components/admin/AdminFormFields";

const STATUSES = [
  { value: "available", label: "Available" },
  { value: "coming_soon", label: "Coming soon" },
  { value: "sold_out", label: "Sold out" },
];

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="-mt-4 font-mono text-[10px] uppercase tracking-widest text-brand-steel">{children}</p>;
}

export function ProductFormFields({ product }: { product?: Product }) {
  const dollars = (cents?: number | null) => (cents != null ? (cents / 100).toFixed(2) : "");

  return (
    <>
      <Field label="Title" name="title" defaultValue={product?.title} required />
      <Field label="Slug (optional)" name="slug" defaultValue={product?.slug} />
      <Field label="Category" name="category" defaultValue={product?.category ?? "Tees"} required />
      <Hint>Products are grouped into shop tabs by category, e.g. Tees, Headwear, Accessories, Parts</Hint>
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Price (USD)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product ? dollars(product.priceCents) : "35"}
          required
        />
        <Field
          label="Compare-at price (optional)"
          name="compareAt"
          type="number"
          step="0.01"
          min="0"
          defaultValue={dollars(product?.compareAtCents)}
        />
      </div>
      <Hint>Set a compare-at price higher than the price to show it as on sale</Hint>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Inventory" name="inventory" type="number" min="0" defaultValue={product?.inventory ?? 10} required />
        <div className="space-y-2">
          <label htmlFor="status" className="block font-mono text-xs uppercase tracking-widest text-brand-chrome">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={product?.status ?? "available"}
            className="w-full border border-white/10 bg-brand-black p-3 text-white outline-none focus:border-brand-rust"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Field label="Sizes (optional)" name="sizes" defaultValue={product?.sizes} />
      <Hint>Comma-separated, e.g. S, M, L, XL, 2XL. Leave blank for one-size items</Hint>
      <Field label="Main image URL" name="imageUrl" defaultValue={product?.imageUrl} />
      <Field label="Gallery image URLs" name="gallery" defaultValue={product?.gallery} textarea rows={3} />
      <Hint>One URL per line. The first gallery image is shown on hover in the shop grid</Hint>
      <Field label="Description" name="description" defaultValue={product?.description} textarea rows={6} required />
      <CheckboxField label="Featured (shown first on home page)" name="featured" defaultChecked={product?.featured} />
      <CheckboxField label="Active (visible in shop)" name="active" defaultChecked={product?.active ?? true} />
    </>
  );
}
