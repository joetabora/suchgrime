import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [features, builds] = await Promise.all([
    prisma.feature.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.build.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      take: 3,
    }),
  ]);

  const [mainFeature, ...sideFeatures] = features;

  return (
    <div className="flex w-full flex-col">
      <section className="relative flex h-[85vh] min-h-[600px] w-full items-end pb-12 md:pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
          <Image
            src="/IMG_1688_2.jpg"
            alt="Custom chopper on an open road"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale-[0.3]"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block h-[1px] w-12 bg-brand-rust" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-rust">
                Vol. 01 / Issue 01
              </span>
            </div>
            <h1 className="mb-6 font-bebas text-7xl uppercase leading-[0.85] tracking-tight text-white drop-shadow-lg md:text-9xl lg:text-[11rem]">
              Built Here.
              <br />
              <span className="bg-gradient-to-r from-white to-brand-steel bg-clip-text text-transparent">
                Ridden Everywhere.
              </span>
            </h1>
            <p className="mb-8 max-w-xl font-playfair text-xl italic text-brand-chrome md:text-2xl">
              The people. The builds. The grime. Documenting Milwaukee&apos;s independent motorcycle culture, one garage at a time.
            </p>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-sm uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-chrome"
            >
              Read the Features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-black py-24">
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-bebas text-5xl uppercase tracking-tight text-white md:text-7xl">
                Featured Iron
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-brand-steel">
                Latest editorial stories
              </p>
            </div>
            <Link
              href="/features"
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-brand-rust transition-colors hover:text-white"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {mainFeature ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-4 lg:gap-8">
              <Link
                href="/features"
                className="group relative col-span-1 flex h-[600px] flex-col justify-end overflow-hidden md:col-span-8"
              >
                <div className="absolute inset-0 z-0 bg-brand-graphite">
                  {mainFeature.imageUrl && (
                    <Image
                      src={mainFeature.imageUrl}
                      alt={mainFeature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover opacity-80 grayscale-[0.2] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                </div>
                <div className="relative z-10 p-8 md:p-12">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="bg-brand-rust px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                      {mainFeature.type}
                    </span>
                    {mainFeature.location && (
                      <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-brand-chrome">
                        <MapPin size={10} /> {mainFeature.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-4 font-oswald text-4xl uppercase leading-none text-white transition-colors group-hover:text-brand-chrome md:text-5xl lg:text-6xl">
                    {mainFeature.title}
                  </h3>
                  <p className="hidden max-w-lg font-playfair text-lg italic text-brand-chrome md:block">
                    {mainFeature.excerpt}
                  </p>
                </div>
              </Link>

              <div className="col-span-1 flex flex-col gap-8 md:col-span-4 md:gap-4 lg:gap-8">
                {sideFeatures[0] && (
                  <Link
                    href="/features"
                    className="group relative flex h-[284px] flex-col justify-end overflow-hidden"
                  >
                    <div className="absolute inset-0 z-0 bg-brand-graphite">
                      {sideFeatures[0].imageUrl && (
                        <Image
                          src={sideFeatures[0].imageUrl}
                          alt={sideFeatures[0].title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
                    </div>
                    <div className="relative z-10 p-6">
                      <h3 className="mb-2 font-oswald text-2xl uppercase leading-tight text-white transition-colors group-hover:text-brand-chrome">
                        {sideFeatures[0].title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                        {sideFeatures[0].type}
                      </span>
                    </div>
                  </Link>
                )}

                {sideFeatures[1] && (
                  <Link
                    href="/features"
                    className="group relative flex h-[284px] flex-col justify-end overflow-hidden border border-white/5 bg-brand-graphite p-6 transition-colors hover:bg-white/5"
                  >
                    <div className="mb-auto flex items-start justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">
                        {sideFeatures[1].type}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-3 font-playfair text-2xl italic text-white transition-colors group-hover:text-brand-chrome">
                        {sideFeatures[1].excerpt}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-brand-steel">
                        {sideFeatures[1].title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <p className="font-inter text-brand-steel">
              No features yet — add some in{" "}
              <Link href="/admin" className="text-brand-rust underline">
                admin
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <section className="relative border-y border-brand-steel/20 bg-brand-offwhite py-24 text-brand-black">
        <div className="texture-overlay opacity-[0.05]" />
        <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-rust">
              <span className="h-[1px] w-8 bg-brand-rust" /> Work In Progress{" "}
              <span className="h-[1px] w-8 bg-brand-rust" />
            </span>
            <h2 className="font-bebas text-6xl uppercase tracking-tight md:text-8xl">The Garage</h2>
            <p className="mt-6 max-w-2xl font-inter text-brand-graphite">
              Celebrating the unfinished, the imperfect, and the obsessive. These are the build journals of Milwaukee&apos;s late-night fabricators.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {builds.map((build) => (
              <Link href="/builds" key={build.id} className="group flex flex-col">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-brand-graphite">
                  {build.imageUrl && (
                    <Image
                      src={build.imageUrl}
                      alt={build.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  )}
                  <div className="absolute left-4 top-4 bg-brand-black px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    Status: {build.stage}
                  </div>
                </div>
                <div className="border-t-2 border-brand-black pt-4">
                  <h3 className="mb-2 font-oswald text-3xl uppercase transition-colors group-hover:text-brand-rust">
                    {build.title}
                  </h3>
                  <p className="mb-4 font-playfair text-brand-graphite">{build.excerpt}</p>
                  <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest">
                    View Journal <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/builds"
              className="inline-block border-2 border-brand-black px-8 py-4 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-brand-black hover:text-white"
            >
              Enter The Garage
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-black py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-5">
          <span className="select-none whitespace-nowrap font-bebas text-[30vw] leading-none text-white">
            MKE WI
          </span>
        </div>

        <div className="relative z-10 container mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-square w-full max-w-lg border-[12px] border-white/5 bg-brand-graphite lg:ml-0">
                <Image
                  src="https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1200&auto=format&fit=crop"
                  alt="Milwaukee riders"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute -bottom-8 -right-8 flex h-48 w-48 rotate-3 flex-col items-center justify-center bg-brand-rust/90 p-6 text-white">
                  <span className="mb-2 w-full border-b border-white/30 pb-2 text-center font-mono text-xs uppercase tracking-widest">
                    Location
                  </span>
                  <span className="mt-2 text-center font-bebas text-4xl leading-none">
                    MILWAUKEE
                    <br />
                    WISCONSIN
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="mb-8 font-oswald text-5xl uppercase text-white md:text-7xl">
                This Is Our City
              </h2>
              <div className="space-y-6 font-inter text-lg text-brand-chrome">
                <p>
                  SuchGrime isn&apos;t just about the machines. It&apos;s about the people who build them, the streets they ride on, and the culture that binds them together.
                </p>
                <p>
                  From the industrial ruins of the Menomonee Valley to the late-night garage sessions in Riverwest, this city is built on steel and oil. We&apos;re here to document the independent builders, the local clubs, and the riders keeping the chopper scene alive in the Midwest.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/people"
                  className="border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-brand-black"
                >
                  Meet the People
                </Link>
                <Link
                  href="/events"
                  className="border border-transparent px-6 py-3 font-mono text-xs uppercase tracking-widest text-brand-steel transition-colors hover:text-white"
                >
                  Local Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-brand-rust py-32 text-center">
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="mb-6 font-bebas text-6xl uppercase tracking-tight text-white drop-shadow-xl md:text-9xl">
            Got a Build?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-playfair text-xl italic text-white/90 md:text-2xl">
            Whether it&apos;s a finished showpiece or a pile of parts on a greasy floor. We want to see what you&apos;re working on.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-brand-black px-12 py-5 font-oswald text-2xl uppercase text-white shadow-2xl transition-colors hover:bg-white hover:text-brand-black"
          >
            Submit Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
