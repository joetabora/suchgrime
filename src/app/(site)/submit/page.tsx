import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "Submit Your Story",
};

const input = "w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-ink disabled:opacity-60";

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-screen-md px-4 pb-24 pt-10 md:px-8">
      <PageHeader kicker="Get featured" title="Submit" text="Got a build, a story, or an event? Tell us about it." />

      <div className="mb-6 rounded-xl border border-mustard bg-mustard/15 px-5 py-4 text-sm">
        Online submissions aren&apos;t open yet. This form is a preview and doesn&apos;t send anything.
      </div>

      <form className="space-y-6 rounded-[2rem] border border-line bg-card p-6 md:p-10">
        <fieldset disabled className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="label block">Name</label>
              <input type="text" id="name" className={input} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="label block">Email</label>
              <input type="email" id="email" className={input} placeholder="your@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="label block">Submission type</label>
            <select id="type" className={input}>
              <option>Finished build feature</option>
              <option>Garage / WIP journal</option>
              <option>Event coverage</option>
              <option>Photography</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="label block">The details</label>
            <textarea
              id="message"
              rows={6}
              className={`${input} resize-none`}
              placeholder="Tell us about the bike, the parts, the struggles, or the event..."
            />
          </div>
          <button type="button" className="btn-blood w-full disabled:cursor-not-allowed disabled:opacity-50">
            Send it
          </button>
        </fieldset>
      </form>
    </div>
  );
}
