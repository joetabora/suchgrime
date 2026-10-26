import Image from "next/image";
import { MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { EmptyState, PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Features",
};

export default async function FeaturesPage() {
  const features = await safeQuery(
    () => prisma.feature.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } }),
    []
  );

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-24 pt-10 md:px-8">
      <PageHeader
        kicker="Media"
        title="Features"
        text="Deep dives into the machines and the obsessed people who build them."
      />

      {features.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.id} id={feature.slug} className="group">
              <div className="relative mb-5 aspect-[3/2] overflow-hidden rounded-2xl bg-paper-deep">
                {feature.imageUrl && (
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="ribbon absolute left-4 top-4">{feature.type}</span>
              </div>
              <div className="label flex flex-wrap items-center gap-4 text-[0.65rem] text-ink-soft">
                <span>{feature.publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                {feature.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={11} /> {feature.location}
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-goth text-4xl leading-none md:text-5xl">{feature.title}</h2>
              <p className="mt-3 max-w-xl text-lg text-ink-soft">{feature.excerpt}</p>
              {feature.body && <div className="mt-4 max-w-xl whitespace-pre-line leading-relaxed">{feature.body}</div>}
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No stories yet" text="The first feature is in the darkroom." />
      )}
    </div>
  );
}
