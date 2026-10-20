import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO / OPENING SCENE */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end pb-12 md:pb-24">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent z-10" />
          <Image
            src="/IMG_1688_2.jpg"
            alt="Custom chopper on an open road"
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center grayscale-[0.3]"
            priority
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-brand-rust inline-block"></span>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-rust">Vol. 01 / Issue 01</span>
            </div>
            <h1 className="font-bebas text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight text-white mb-6 uppercase drop-shadow-lg">
              Built Here.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-steel">Ridden Everywhere.</span>
            </h1>
            <p className="font-playfair italic text-xl md:text-2xl text-brand-chrome max-w-xl mb-8">
              The people. The builds. The grime. Documenting Milwaukee's independent motorcycle culture, one garage at a time.
            </p>
            <Link 
              href="/features" 
              className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase bg-white text-brand-black px-8 py-4 hover:bg-brand-chrome transition-colors"
            >
              Read the Features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED STORIES */}
      <section className="py-24 bg-brand-black relative">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white uppercase">Featured Iron</h2>
              <p className="font-mono text-xs tracking-widest uppercase text-brand-steel mt-2">Latest editorial stories</p>
            </div>
            <Link href="/features" className="font-mono text-xs tracking-widest uppercase text-brand-rust hover:text-white transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-8">
            {/* Main Feature */}
            <Link href="/features/ironhead-revival" className="group col-span-1 md:col-span-8 relative h-[600px] flex flex-col justify-end overflow-hidden">
              <div className="absolute inset-0 bg-brand-graphite z-0">
                <Image
                  src="https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=2000&auto=format&fit=crop"
                  alt="Ironhead builder in workshop"
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-rust text-white font-mono text-[10px] px-2 py-1 uppercase tracking-widest">Feature</span>
                  <span className="text-brand-chrome font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"><MapPin size={10}/> Walker's Point, MKE</span>
                </div>
                <h3 className="font-oswald text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-none mb-4 group-hover:text-brand-chrome transition-colors">
                  The '74 Ironhead Survival
                </h3>
                <p className="font-playfair italic text-lg text-brand-chrome max-w-lg hidden md:block">
                  After sitting in a damp basement for two decades, this Sportster was dragged into the light and stripped to its soul.
                </p>
              </div>
            </Link>

            {/* Secondary Features */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-8 md:gap-4 lg:gap-8">
              <Link href="/features/panhead-chopper" className="group relative h-[284px] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 bg-brand-graphite z-0">
                  <Image
                    src="https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1000&auto=format&fit=crop"
                    alt="Panhead Chopper"
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="font-oswald text-2xl text-white uppercase leading-tight mb-2 group-hover:text-brand-chrome transition-colors">
                    Long & Low: The 10-Over Panhead
                  </h3>
                  <span className="font-mono text-[10px] text-brand-steel uppercase tracking-widest">By Marcus Thorne</span>
                </div>
              </Link>
              
              <Link href="/features/shop-tour-milwaukee" className="group relative h-[284px] flex flex-col justify-end overflow-hidden bg-brand-graphite border border-white/5 p-6 hover:bg-white/5 transition-colors">
                <div className="mb-auto flex justify-between items-start">
                  <span className="font-mono text-[10px] text-brand-steel uppercase tracking-widest">Shop Tour</span>
                  <span className="text-brand-rust">No. 04</span>
                </div>
                <div>
                  <h3 className="font-playfair italic text-2xl text-white mb-3 group-hover:text-brand-chrome transition-colors">
                    "We don't build show bikes. We build machines meant to get abused on the highway."
                  </h3>
                  <p className="font-mono text-xs text-brand-steel uppercase tracking-widest">Inside Rust Belt Cycles</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE GARAGE / BUILDS */}
      <section className="py-24 bg-brand-offwhite text-brand-black relative border-y border-brand-steel/20">
        <div className="texture-overlay opacity-[0.05]" />
        <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-xs tracking-widest uppercase text-brand-rust mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-brand-rust"></span> Work In Progress <span className="w-8 h-[1px] bg-brand-rust"></span>
            </span>
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tight uppercase">The Garage</h2>
            <p className="font-inter text-brand-graphite max-w-2xl mt-6">
              Celebrating the unfinished, the imperfect, and the obsessive. These are the build journals of Milwaukee's late-night fabricators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                id: 1,
                title: "Project Shovel",
                stage: "Fabrication",
                desc: "Hardtailing an 80-inch Shovelhead. Measuring twice, cutting once.",
                img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 2,
                title: "The Survivor",
                stage: "Mockup",
                desc: "Piecing together a period-correct 70s survivor build from swap meet finds.",
                img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 3,
                title: "Evo Sporty",
                stage: "Tear Down",
                desc: "Stripping a pristine 1200 down to the frame. The point of no return.",
                img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop"
              }
            ].map((build) => (
              <Link href={`/builds/${build.id}`} key={build.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] bg-brand-graphite mb-6 overflow-hidden">
                  <Image 
                    src={build.img}
                    alt={build.title}
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-black text-white font-mono text-[10px] px-2 py-1 uppercase tracking-widest">
                    Status: {build.stage}
                  </div>
                </div>
                <div className="border-t-2 border-brand-black pt-4">
                  <h3 className="font-oswald text-3xl uppercase mb-2 group-hover:text-brand-rust transition-colors">{build.title}</h3>
                  <p className="font-playfair text-brand-graphite mb-4">{build.desc}</p>
                  <span className="font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-1">
                    View Journal <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/builds" className="inline-block border-2 border-brand-black font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-brand-black hover:text-white transition-colors">
              Enter The Garage
            </Link>
          </div>
        </div>
      </section>

      {/* MILWAUKEE & COMMUNITY */}
      <section className="py-24 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 pointer-events-none flex items-center justify-center">
          <span className="font-bebas text-[30vw] leading-none whitespace-nowrap text-white select-none">MKE WI</span>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square w-full max-w-lg mx-auto lg:ml-0 bg-brand-graphite border-[12px] border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=1200&auto=format&fit=crop"
                  alt="Milwaukee riders"
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-rust/90 flex flex-col items-center justify-center text-white p-6 rotate-3">
                  <span className="font-mono text-xs uppercase tracking-widest mb-2 border-b border-white/30 pb-2 w-full text-center">Location</span>
                  <span className="font-bebas text-4xl text-center leading-none mt-2">MILWAUKEE<br/>WISCONSIN</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="font-oswald text-5xl md:text-7xl uppercase text-white mb-8">This Is Our City</h2>
              <div className="space-y-6 font-inter text-brand-chrome text-lg">
                <p>
                  SuchGrime isn't just about the machines. It's about the people who build them, the streets they ride on, and the culture that binds them together.
                </p>
                <p>
                  From the industrial ruins of the Menomonee Valley to the late-night garage sessions in Riverwest, this city is built on steel and oil. We're here to document the independent builders, the local clubs, and the riders keeping the chopper scene alive in the Midwest.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/people" className="font-mono text-xs tracking-widest uppercase border border-white/20 text-white px-6 py-3 hover:bg-white hover:text-brand-black transition-colors">
                  Meet the People
                </Link>
                <Link href="/events" className="font-mono text-xs tracking-widest uppercase border border-transparent text-brand-steel hover:text-white px-6 py-3 transition-colors">
                  Local Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 bg-brand-rust relative text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-bebas text-6xl md:text-9xl tracking-tight text-white uppercase mb-6 drop-shadow-xl">Got a Build?</h2>
          <p className="font-playfair italic text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
            Whether it's a finished showpiece or a pile of parts on a greasy floor. We want to see what you're working on.
          </p>
          <Link href="/submit" className="inline-block font-oswald text-2xl uppercase bg-brand-black text-white px-12 py-5 hover:bg-white hover:text-brand-black transition-colors shadow-2xl">
            Submit Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
