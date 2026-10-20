import Image from "next/image";

export const metadata = {
  title: "About | SUCHGRIME",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-brand-rust mb-4 block">Our Story</span>
          <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-8">About SuchGrime</h1>
          
          <div className="space-y-6 font-inter text-brand-chrome text-lg max-w-xl">
            <p className="font-playfair italic text-2xl text-white mb-8 border-l-2 border-brand-rust pl-4">
              "We didn't see our culture represented in the glossy magazines. So we started documenting it ourselves."
            </p>
            <p>
              SuchGrime was born out of the garages of Milwaukee. It started as a way to take photos of friends' bikes and document the late-night struggles of building a chopper from a pile of old parts.
            </p>
            <p>
              Today, it's an independent publication and media brand dedicated to the custom motorcycle culture in the Midwest. We care about the process, the grease, the mistakes, and the obsession it takes to build a machine with your own two hands.
            </p>
            <p>
              We aren't interested in generic baggers bought off a showroom floor. We're interested in the rusty Ironhead that someone brought back to life, the hardtailed Evo built in a cramped shed, and the people who ride them.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-[3/4] bg-brand-graphite border-[12px] border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"
            alt="SuchGrime Garage"
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover grayscale"
          />
          <div className="absolute -bottom-8 -left-8 bg-brand-black text-white p-6 border border-white/10 max-w-xs hidden md:block">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-steel mb-2">Est. 2026</p>
            <p className="font-oswald text-xl uppercase">Documenting the underground motorcycle scene of Milwaukee.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
