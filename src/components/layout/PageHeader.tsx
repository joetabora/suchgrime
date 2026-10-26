export function PageHeader({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <header className="mb-14 border-b border-line pb-10 text-center">
      <span className="ribbon">{kicker}</span>
      <h1 className="mt-4 font-goth text-6xl leading-none md:text-8xl">{title}</h1>
      {text && <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">{text}</p>}
    </header>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line py-20 text-center">
      <p className="font-goth text-4xl">{title}</p>
      <p className="mt-2 text-ink-soft">{text}</p>
    </div>
  );
}
