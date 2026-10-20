import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Features | SUCHGRIME",
};

export default async function FeaturesPage() {
  const features = await prisma.feature.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 py-12 md:px-8">
      <header className="mb-20">
        <h1 className="mb-4 font-bebas text-7xl uppercase tracking-tight text-white md:text-9xl">
          Features
        </h1>
        <p className="max-w-2xl font-playfair text-xl italic text-brand-steel md:text-2xl">
          Deep dives into the machines and the obsessed individuals who build them.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        {features.map((feature) => (
          <article key={feature.id} className="group block">
            <div className="relative mb-6 aspect-[3/2] overflow-hidden bg-brand-graphite">
              {feature.imageUrl && (
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80 grayscale-[0.5] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
              )}
              <div className="absolute left-0 top-0 flex items-center gap-4 border-b border-r border-white/10 bg-brand-black/80 px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">
                  {feature.type}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                  {feature.publishedAt.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
            <h2 className="mb-3 font-oswald text-4xl uppercase text-white transition-colors group-hover:text-brand-rust">
              {feature.title}
            </h2>
            <p className="mb-4 max-w-xl font-inter text-lg text-brand-chrome">{feature.excerpt}</p>
            {feature.location && (
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                {feature.location}
              </p>
            )}
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-steel">
              Story · {feature.slug} <ArrowRight size={14} />
            </span>
          </article>
        ))}
      </div>

      {features.length === 0 && (
        <p className="font-inter text-brand-steel">No features published yet.</p>
      )}
    </div>
  );
}
