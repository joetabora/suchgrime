import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteFeature } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminFeaturesPage() {
  const features = await prisma.feature.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-bebas text-5xl tracking-tight text-white">Features</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-steel">
            {features.length} stories
          </p>
        </div>
        <Link
          href="/admin/features/new"
          className="bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-chrome"
        >
          Add feature
        </Link>
      </div>

      <div className="divide-y divide-white/10 border border-white/10">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-oswald text-xl uppercase text-white">{feature.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                {feature.type} · {feature.published ? "Published" : "Draft"} · /{feature.slug}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/features/${feature.id}`}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-chrome hover:text-white"
              >
                Edit
              </Link>
              <form action={deleteFeature}>
                <input type="hidden" name="id" value={feature.id} />
                <button type="submit" className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {features.length === 0 && (
          <p className="p-8 font-inter text-sm text-brand-steel">No features yet.</p>
        )}
      </div>
    </div>
  );
}
