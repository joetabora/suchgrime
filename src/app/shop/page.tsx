import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Supply | SUCHGRIME",
};

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl py-12">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-steel/20 pb-12">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest uppercase text-brand-rust mb-4 block">Hardware & Threads</span>
          <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">Supply</h1>
          <p className="font-inter text-brand-chrome text-lg">
            Original merchandise, print issues, and limited run custom parts. Support the scene.
          </p>
        </div>
        <div className="mt-8 md:mt-0 font-mono text-[10px] text-brand-steel uppercase tracking-widest text-right">
          <p>Winter Drop: Coming Soon</p>
          <p className="text-brand-rust">Pre-orders open next month</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {[
          { 
            id: "tee-01", 
            title: "Issue 01 Logo Tee", 
            category: "Apparel", 
            price: "$35", 
            status: "Coming Soon",
            desc: "Heavyweight 100% cotton tee in faded black. Printed locally in Milwaukee.",
            img: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop" 
          },
          { 
            id: "banner-01", 
            title: "SuchGrime Garage Banner", 
            category: "Accessories", 
            price: "$45", 
            status: "Coming Soon",
            desc: "3x5 foot heavy canvas banner with brass grommets. For the workshop wall.",
            img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop" 
          },
          { 
            id: "points-cover", 
            title: "Sandcast Points Cover", 
            category: "Parts", 
            price: "$65", 
            status: "Prototyping",
            desc: "Cast aluminum points cover for Big Twin and Sportster. Raw finish.",
            img: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=800&auto=format&fit=crop" 
          }
        ].map((item) => (
          <div key={item.id} className="group flex flex-col">
            <div className="relative aspect-square bg-brand-graphite mb-6 overflow-hidden border border-white/5">
              <Image 
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
              />
              {/* Product Status Tag */}
              <div className="absolute top-4 left-4 bg-brand-black text-brand-rust font-mono text-[10px] px-3 py-1.5 uppercase tracking-widest border border-brand-rust/30">
                {item.status}
              </div>
            </div>
            
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[10px] text-brand-steel uppercase tracking-widest">{item.category}</span>
                <span className="font-mono text-sm text-white">{item.price}</span>
              </div>
              <h3 className="font-oswald text-2xl uppercase mb-3 text-white">{item.title}</h3>
              <p className="font-inter text-sm text-brand-chrome/80 mb-6 flex-grow">{item.desc}</p>
              
              <button disabled className="w-full font-mono text-xs tracking-widest uppercase border border-white/20 text-brand-steel py-4 cursor-not-allowed bg-brand-black/50">
                Dropping Winter 2026
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 bg-brand-graphite border border-white/5 text-center">
        <h3 className="font-bebas text-5xl tracking-tight uppercase text-white mb-4">Get Notified</h3>
        <p className="font-inter text-brand-chrome max-w-md mx-auto mb-8">
          We're doing very small runs of our first merch drop. Drop your email to get early access before it hits the site.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow bg-brand-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-rust font-inter text-sm"
          />
          <button 
            type="button"
            className="font-mono text-xs tracking-widest uppercase bg-white text-brand-black px-6 py-3 hover:bg-brand-chrome transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
