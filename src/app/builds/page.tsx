import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Garage | SUCHGRIME",
};

export default function BuildsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-steel/20 pb-12">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest uppercase text-brand-rust mb-4 block">Work In Progress</span>
          <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">The Garage</h1>
          <p className="font-inter text-brand-chrome text-lg">
            Build journals, fabrication notes, and the painful process of getting old iron back on the road.
          </p>
        </div>
        <div className="mt-8 md:mt-0 font-mono text-[10px] text-brand-steel uppercase tracking-widest text-right">
          <p>Total Projects: 24</p>
          <p>Last Updated: Today</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {[
          { id: 1, title: "Project Shovel", stage: "Fabrication", builder: "Dave S.", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop", updated: "2 days ago" },
          { id: 2, title: "The Survivor", stage: "Mockup", builder: "Mike T.", img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop", updated: "1 week ago" },
          { id: 3, title: "Evo Sporty", stage: "Tear Down", builder: "Sarah K.", img: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop", updated: "3 weeks ago" },
          { id: 4, title: "Twin Cam Chopper", stage: "Paint", builder: "John R.", img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop", updated: "1 month ago" },
          { id: 5, title: "Ironhead Bobber", stage: "Wiring", builder: "Chris B.", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop", updated: "2 months ago" },
          { id: 6, title: "Panhead Repo", stage: "Engine Rebuild", builder: "Alex M.", img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop", updated: "3 months ago" }
        ].map((build) => (
          <Link href={`/builds/${build.id}`} key={build.id} className="group block">
            <div className="relative aspect-[3/4] bg-brand-graphite mb-4 overflow-hidden border border-white/5">
              <Image 
                src={build.img}
                alt={build.title}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black to-transparent p-4 pt-12">
                <span className="font-mono text-[10px] text-white uppercase tracking-widest block mb-1">Stage: {build.stage}</span>
              </div>
            </div>
            <h3 className="font-oswald text-2xl uppercase mb-1 group-hover:text-brand-chrome text-white transition-colors">{build.title}</h3>
            <div className="flex justify-between items-center text-brand-steel font-mono text-[10px] uppercase tracking-widest">
              <span>By {build.builder}</span>
              <span>{build.updated}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
