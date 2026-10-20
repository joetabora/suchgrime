import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "People | SUCHGRIME",
};

export default function PeoplePage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <header className="mb-20">
        <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">The People</h1>
        <p className="font-playfair italic text-xl md:text-2xl text-brand-steel max-w-2xl">
          The builders, the riders, and the characters that make up the Milwaukee custom scene.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { name: "Marcus Thorne", role: "Builder / Fabricator", desc: "Specializes in pre-Evo Harleys. Known for his obsessive attention to frame geometry and raw metal finishes.", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop" },
          { name: "Elena Rostova", role: "Painter", desc: "Bringing back 70s style panel paint, heavy flake, and gold leaf from her studio in Bay View.", img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop" },
          { name: "Jimmy 'Ghost' Vance", role: "Rider / Organizer", desc: "The guy behind the annual industrial park scrambles. If there's a ride happening, Jimmy organized it.", img: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop" }
        ].map((person, idx) => (
          <Link href={`/people/${person.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={idx} className="group flex flex-col">
            <div className="relative aspect-square bg-brand-graphite mb-6 overflow-hidden">
              <Image 
                src={person.img}
                alt={person.name}
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <h2 className="font-oswald text-4xl uppercase text-white mb-1 group-hover:text-brand-rust transition-colors">{person.name}</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-rust mb-4 block">{person.role}</span>
            <p className="font-inter text-brand-chrome text-sm">{person.desc}</p>
          </Link>
        ))}
      </div>
      
      <div className="mt-24 border-t border-white/10 pt-16 text-center">
        <h3 className="font-oswald text-3xl uppercase text-white mb-4">Want to be featured?</h3>
        <p className="font-inter text-brand-steel mb-8">We're always looking for interesting builders and riders in the Midwest.</p>
        <Link href="/submit" className="font-mono text-xs tracking-widest uppercase border border-white text-white px-8 py-4 hover:bg-white hover:text-brand-black transition-colors">
          Reach Out
        </Link>
      </div>
    </div>
  );
}
