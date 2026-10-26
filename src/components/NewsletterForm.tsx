"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(subscribeAction, null);

  if (state?.ok) {
    return <p className="font-display text-lg uppercase">You&apos;re on the list.</p>;
  }

  const input =
    tone === "dark"
      ? "border-paper/30 bg-transparent text-paper placeholder:text-paper/50 focus:border-mustard"
      : "border-line bg-card text-ink placeholder:text-ink-soft focus:border-ink";

  return (
    <form action={formAction} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`newsletter-${tone}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${tone}`}
          name="email"
          type="email"
          required
          placeholder="Email address"
          className={`flex-1 rounded-full border px-5 py-3 text-sm outline-none ${input}`}
        />
        <button type="submit" disabled={pending} className={tone === "dark" ? "btn-mustard" : "btn-ink"}>
          {pending ? "…" : "Sign up"}
        </button>
      </div>
      {state?.error && <p className="mt-2 text-sm text-blood">{state.error}</p>}
    </form>
  );
}
