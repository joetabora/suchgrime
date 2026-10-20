import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteBuild } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminBuildsPage() {
  const builds = await prisma.build.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-bebas text-5xl tracking-tight text-white">Builds</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand-steel">
            {builds.length} garage journals
          </p>
        </div>
        <Link
          href="/admin/builds/new"
          className="bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-chrome"
        >
          Add build
        </Link>
      </div>

      <div className="divide-y divide-white/10 border border-white/10">
        {builds.map((build) => (
          <div key={build.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-oswald text-xl uppercase text-white">{build.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                {build.stage} · {build.builder} · {build.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/builds/${build.id}`}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-chrome hover:text-white"
              >
                Edit
              </Link>
              <form action={deleteBuild}>
                <input type="hidden" name="id" value={build.id} />
                <button type="submit" className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {builds.length === 0 && <p className="p-8 font-inter text-sm text-brand-steel">No builds yet.</p>}
      </div>
    </div>
  );
}
