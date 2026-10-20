import Image from "next/image";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Garage | SUCHGRIME",
};

export default async function BuildsPage() {
  const builds = await prisma.build.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
      <header className="mb-20 flex flex-col justify-between border-b border-brand-steel/20 pb-12 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-brand-rust">
            Work In Progress
          </span>
          <h1 className="mb-4 font-bebas text-7xl uppercase tracking-tight text-white md:text-9xl">
            The Garage
          </h1>
          <p className="font-inter text-lg text-brand-chrome">
            Build journals, fabrication notes, and the painful process of getting old iron back on the road.
          </p>
        </div>
        <div className="mt-8 text-right font-mono text-[10px] uppercase tracking-widest text-brand-steel md:mt-0">
          <p>Total Projects: {builds.length}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {builds.map((build) => (
          <article key={build.id} className="group block">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden border border-white/5 bg-brand-graphite">
              {build.imageUrl && (
                <Image
                  src={build.imageUrl}
                  alt={build.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black to-transparent p-4 pt-12">
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white">
                  Stage: {build.stage}
                </span>
              </div>
            </div>
            <h3 className="mb-1 font-oswald text-2xl uppercase text-white">{build.title}</h3>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-steel">
              <span>By {build.builder}</span>
              <span>{build.updatedAt.toLocaleDateString()}</span>
            </div>
            <p className="mt-3 font-playfair text-sm text-brand-chrome">{build.excerpt}</p>
          </article>
        ))}
      </div>

      {builds.length === 0 && (
        <p className="font-inter text-brand-steel">No builds published yet.</p>
      )}
    </div>
  );
}
