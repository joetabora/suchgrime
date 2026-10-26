import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@prisma/client";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { categorySlug, productImages } from "@/lib/products";
import { HeroSlider, type HeroSlide } from "@/components/home/HeroSlider";
import { ProductGrid } from "@/components/shop/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export const dynamic = "force-dynamic";

const PILLARS = [
  { title: "Chopper Iron", text: "Rigid frames, long forks, kicked-out rakes. The machines come first." },
  { title: "Traditional Flash", text: "Bold lines, a handful of colors, nothing wasted. Old-school tattoo flash, redrawn." },
  { title: "Gothic Horror", text: "Skulls, coffins, and graveyard fog. A little dread to go with the gasoline." },
];

export default async function Home() {
  const [features, builds, products] = await Promise.all([
    safeQuery(
      () => prisma.feature.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 4 }),
      []
    ),
    safeQuery(
      () => prisma.build.findMany({ where: { published: true }, orderBy: { updatedAt: "desc" }, take: 3 }),
      []
    ),
    safeQuery(
      () =>
        prisma.product.findMany({
          where: { active: true },
          orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        }),
      []
    ),
  ]);

  const slides: HeroSlide[] = [
    {
      image: "/IMG_1688_2.jpg",
      kicker: "Milwaukee chopper culture",
      title: "Ride Ugly. Die Pretty.",
      text: "Stories from the garage, and goods for the ones who live there.",
      href: "/features",
      cta: "Read the features",
    },
    ...features
      .filter((f) => f.imageUrl)
      .slice(0, 3)
      .map((f) => ({
        image: f.imageUrl!,
        kicker: f.type,
        title: f.title,
        text: f.excerpt,
        href: "/features",
        cta: "Read the story",
      })),
  ];

  const newDrop = products.slice(0, 8);
  const categories = buildCategoryTiles(products);
  const parts = products.filter((p) => categorySlug(p.category) === "parts").slice(0, 4);

  return (
    <div className="flex flex-col">
      <div className="px-3 pt-3 md:px-6 md:pt-5">
        <HeroSlider slides={slides} />
      </div>

      {categories.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl px-4 pt-20 md:px-8">
          <SectionHeading kicker="The Goods" title="Shop by Category" href="/shop" linkLabel="Shop all" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-card"
              >
                {c.image && (
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute bottom-4 left-4 font-goth text-3xl text-paper md:text-4xl">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-screen-2xl px-4 pt-20 md:px-8">
        <SectionHeading kicker="Fresh off the press" title="New Drop" href="/shop" linkLabel="View all" />
        {newDrop.length > 0 ? (
          <ProductGrid products={newDrop} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center">
            <p className="font-goth text-4xl">First drop coming soon</p>
            <p className="mt-2 text-ink-soft">Sign up below to get it before anyone else.</p>
          </div>
        )}
      </section>

      <section className="mt-24 bg-ink py-20 text-paper">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <p className="label text-center text-mustard">What we put on cloth</p>
          <h2 className="mt-3 text-center font-goth text-5xl md:text-7xl">Iron ✦ Ink ✦ Dread</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="border-t border-paper/20 pt-6 text-center">
                <span className="font-goth text-5xl text-blood">{["I", "II", "III"][i]}</span>
                <h3 className="mt-2 font-display text-2xl uppercase">{p.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-paper/70">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/shop" className="btn-mustard">
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl px-4 pt-24 md:px-8">
          <SectionHeading kicker="Media" title="Latest Stories" href="/features" linkLabel="All features" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link key={f.id} href="/features" className="group flex flex-col">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep">
                  {f.imageUrl && (
                    <Image
                      src={f.imageUrl}
                      alt={f.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="label text-[0.65rem] text-blood">{f.type}</p>
                <h3 className="mt-1 font-display text-xl uppercase leading-tight group-hover:text-blood">{f.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{f.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {parts.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl px-4 pt-24 md:px-8">
          <SectionHeading kicker="Hardware" title="Parts & Iron" href="/shop?category=parts" linkLabel="All parts" />
          <ProductGrid products={parts} />
        </section>
      )}

      {builds.length > 0 && (
        <section className="mx-auto w-full max-w-screen-2xl px-4 pt-24 md:px-8">
          <SectionHeading kicker="Work in progress" title="The Garage" href="/builds" linkLabel="All builds" />
          <div className="grid gap-6 md:grid-cols-3">
            {builds.map((b) => (
              <Link
                key={b.id}
                href="/builds"
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 text-paper"
              >
                {b.imageUrl && (
                  <Image
                    src={b.imageUrl}
                    alt={b.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="relative">
                  <span className="ribbon">{b.stage}</span>
                  <h3 className="mt-3 font-goth text-4xl leading-none">{b.title}</h3>
                  <p className="mt-2 text-sm text-paper/75">by {b.builder}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-24 w-full max-w-screen-2xl px-4 md:px-8">
        <div className="grid items-center gap-8 rounded-[2rem] bg-blood px-6 py-14 text-paper md:grid-cols-2 md:px-14">
          <div>
            <h2 className="font-goth text-5xl md:text-6xl">Got a build?</h2>
            <p className="mt-3 max-w-md text-paper/85">
              Finished showpiece or a pile of parts on a greasy floor, we want to see it.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link href="/submit" className="btn-mustard">
              Submit your bike <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-2xl px-4 py-24 text-center md:px-8">
        <p className="label text-blood">The mailing list</p>
        <h2 className="mt-2 font-goth text-5xl md:text-6xl">First dibs on every drop</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">New designs, restocks, and stories. No spam.</p>
        <div className="mt-8 flex justify-center">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-4">
      <div>
        <p className="label text-blood">{kicker}</p>
        <h2 className="mt-1 font-goth text-4xl md:text-6xl">{title}</h2>
      </div>
      <Link href={href} className="label flex shrink-0 items-center gap-1 hover:text-blood">
        {linkLabel} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function buildCategoryTiles(products: Product[]) {
  const map = new Map<string, { name: string; slug: string; image?: string }>();
  for (const p of products) {
    const slug = categorySlug(p.category);
    const existing = map.get(slug);
    if (!existing) map.set(slug, { name: p.category, slug, image: productImages(p)[0] });
    else if (!existing.image) existing.image = productImages(p)[0];
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 4);
}
