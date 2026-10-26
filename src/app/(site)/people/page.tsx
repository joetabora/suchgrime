import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata = {
  title: "People",
};

export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-10 md:px-8">
      <PageHeader
        kicker="The scene"
        title="The People"
        text="The builders, painters, riders, and characters that make up the Milwaukee custom scene."
      />

      <div className="rounded-[2rem] bg-ink px-6 py-16 text-center text-paper">
        <p className="font-goth text-5xl">Profiles coming soon</p>
        <p className="mx-auto mt-3 max-w-lg text-paper/75">
          We&apos;re out shooting the first round of portraits now. Building, painting, or wrenching in the Midwest?
          We want to meet you.
        </p>
        <Link href="/submit" className="btn-mustard mt-8">
          Reach out
        </Link>
      </div>
    </div>
  );
}
