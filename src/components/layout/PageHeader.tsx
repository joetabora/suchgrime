export function PageHeader({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <header className="mb-12 max-w-2xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{kicker}</p>
      <h1 className="mt-2 font-bebas text-6xl leading-[0.85] tracking-tight md:text-8xl">{title}</h1>
      {text && <p className="mt-4 text-base leading-relaxed text-secondary md:text-lg">{text}</p>}
    </header>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-xl rounded-sm bg-surface px-6 py-12 md:px-8">
      <p className="font-bebas text-5xl leading-none tracking-tight">{title}</p>
      <p className="mt-3 text-secondary">{text}</p>
    </div>
  );
}
