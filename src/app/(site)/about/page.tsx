import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-24 pt-10 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="ribbon">Our story</span>
          <h1 className="mt-4 font-goth text-6xl leading-none md:text-8xl">About SuchGrime</h1>
          <div className="mt-8 max-w-xl space-y-5 text-lg text-ink-soft">
            <p className="border-l-4 border-blood pl-4 font-display text-2xl uppercase leading-snug text-ink">
              We didn&apos;t see our culture in the glossy magazines, so we started documenting it ourselves.
            </p>
            <p>
              SuchGrime came out of Milwaukee garages. It started as a way to shoot friends&apos; bikes and document the
              late-night grind of building a chopper from a pile of old parts.
            </p>
            <p>
              Now it&apos;s an independent media brand and shop for Midwest custom motorcycle culture. We care about the
              process, the grease, the mistakes, and the obsession it takes to build a machine with your own hands.
            </p>
            <p>
              The goods follow the same code: chopper iron, American traditional flash, and a heavy dose of gothic
              horror, made in small runs.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-blood">
              Shop the goods
            </Link>
            <Link href="/features" className="btn-outline">
              Read the features
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-deep">
          <Image
            src="/IMG_1688_2.jpg"
            alt="Custom chopper"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
