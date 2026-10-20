import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Features | SUCHGRIME",
};

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <header className="mb-20">
        <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">Features</h1>
        <p className="font-playfair italic text-xl md:text-2xl text-brand-steel max-w-2xl">
          Deep dives into the machines and the obsessed individuals who build them.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {[
          {
            id: "ironhead-revival",
            title: "The '74 Ironhead Survival",
            desc: "After sitting in a damp basement for two decades, this Sportster was dragged into the light and stripped to its soul.",
            img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2000&auto=format&fit=crop",
            type: "Feature",
            date: "OCT 2026"
          },
          {
            id: "panhead-chopper",
            title: "Long & Low: The 10-Over Panhead",
            desc: "A meticulous build that proves sometimes the classic chopper silhouette is exactly what's needed.",
            img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=1000&auto=format&fit=crop",
            type: "Profile",
            date: "SEP 2026"
          },
          {
            id: "shop-tour-milwaukee",
            title: "Inside Rust Belt Cycles",
            desc: "\"We don't build show bikes. We build machines meant to get abused on the highway.\"",
            img: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1000&auto=format&fit=crop",
            type: "Shop Tour",
            date: "AUG 2026"
          },
          {
            id: "shovelhead-saga",
            title: "The Riverwest Shovelhead",
            desc: "Built on a budget in a one-car garage, this Shovelhead embodies the spirit of Milwaukee's underground scene.",
            img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000&auto=format&fit=crop",
            type: "Feature",
            date: "JUL 2026"
          }
        ].map((feature, idx) => (
          <Link href={`/features/${feature.id}`} key={idx} className="group block">
            <div className="relative aspect-[3/2] bg-brand-graphite mb-6 overflow-hidden">
              <Image
                src={feature.img}
                alt={feature.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0"
              />
              <div className="absolute top-0 left-0 bg-brand-black/80 px-4 py-2 border-b border-r border-white/10 flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-rust">{feature.type}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-steel">{feature.date}</span>
              </div>
            </div>
            <h2 className="font-oswald text-4xl uppercase text-white mb-3 group-hover:text-brand-rust transition-colors">{feature.title}</h2>
            <p className="font-inter text-brand-chrome text-lg max-w-xl mb-4">{feature.desc}</p>
            <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2 text-brand-steel group-hover:text-white transition-colors">
              Read Story <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
