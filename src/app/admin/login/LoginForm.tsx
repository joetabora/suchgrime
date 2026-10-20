"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

type State = { error?: string } | null;

async function action(_prev: State, formData: FormData): Promise<State> {
  return loginAction(formData);
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6 border border-white/10 bg-brand-graphite p-8">
      <div className="space-y-2">
        <label htmlFor="password" className="block font-mono text-xs uppercase tracking-widest">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full border border-white/10 bg-brand-black p-3 text-white outline-none focus:border-brand-rust"
        />
      </div>
      {state?.error && <p className="font-inter text-sm text-brand-rust">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand-rust py-3 font-oswald text-xl uppercase tracking-wider text-white hover:bg-white hover:text-brand-black disabled:opacity-60"
      >
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
