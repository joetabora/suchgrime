import Image from "next/image";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { EmptyState, PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Garage",
};

export default async function BuildsPage() {
  const builds = await safeQuery(
    () => prisma.build.findMany({ where: { published: true }, orderBy: { updatedAt: "desc" } }),
    []
  );

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-24 pt-10 md:px-8">
      <PageHeader
        kicker="Work in progress"
        title="The Garage"
        text="Build journals, fabrication notes, and the painful process of getting old iron back on the road."
      />

      {builds.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build) => (
            <article key={build.id} id={build.slug} className="group">
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-paper-deep">
                {build.imageUrl && (
                  <Image
                    src={build.imageUrl}
                    alt={build.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="ribbon absolute left-4 top-4">{build.stage}</span>
              </div>
              <h2 className="font-goth text-4xl leading-none">{build.title}</h2>
              <p className="label mt-2 text-[0.65rem] text-ink-soft">
                By {build.builder} · Updated {build.updatedAt.toLocaleDateString("en-US")}
              </p>
              <p className="mt-3 text-ink-soft">{build.excerpt}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="Garage is empty" text="Build journals will show up here as they're logged." />
      )}
    </div>
  );
}
