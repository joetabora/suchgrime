export const metadata = {
  title: "Submit Your Story | SUCHGRIME",
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 max-w-screen-md py-12">
      <header className="mb-16 text-center">
        <h1 className="font-bebas text-7xl md:text-9xl tracking-tight text-white uppercase mb-4">Submit</h1>
        <p className="font-playfair italic text-xl md:text-2xl text-brand-steel">
          Got a build, a story, or an event? Tell us about it.
        </p>
      </header>

      <form className="space-y-8 bg-brand-graphite p-8 md:p-12 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-brand-chrome block">Name</label>
            <input type="text" id="name" className="w-full bg-brand-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-rust transition-colors font-inter" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-brand-chrome block">Email</label>
            <input type="email" id="email" className="w-full bg-brand-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-rust transition-colors font-inter" placeholder="your@email.com" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="font-mono text-xs uppercase tracking-widest text-brand-chrome block">Submission Type</label>
          <select id="type" className="w-full bg-brand-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-rust transition-colors font-inter appearance-none rounded-none">
            <option>Finished Build Feature</option>
            <option>Garage / WIP Journal</option>
            <option>Event Coverage</option>
            <option>Photography Submission</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-brand-chrome block">The Details</label>
          <textarea id="message" rows={6} className="w-full bg-brand-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-rust transition-colors font-inter resize-none" placeholder="Tell us about the bike, the parts, the struggles, or the event..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-brand-chrome block">Photos</label>
          <div className="border-2 border-dashed border-white/20 p-8 text-center hover:border-brand-rust transition-colors cursor-pointer bg-brand-black">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-steel">Click to upload photos, or drag and drop</p>
            <p className="font-inter text-xs text-brand-steel/50 mt-2">JPEG, PNG up to 10MB each</p>
          </div>
        </div>

        <button type="button" className="w-full font-oswald text-2xl uppercase tracking-wider bg-brand-rust text-white py-4 hover:bg-white hover:text-brand-black transition-colors">
          Send It
        </button>
      </form>
    </div>
  );
}
