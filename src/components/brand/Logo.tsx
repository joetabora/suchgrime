import Link from "next/link";

export function Logo({ size = "md", onClick }: { size?: "md" | "lg"; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group inline-flex flex-col items-center leading-none" aria-label="SuchGrime home">
      <span
        className={`font-goth text-ink transition-colors group-hover:text-blood ${
          size === "lg" ? "text-6xl md:text-8xl" : "text-3xl md:text-4xl"
        }`}
      >
        SuchGrime
      </span>
      <span className={`label text-ink-soft ${size === "lg" ? "mt-2 text-sm" : "mt-0.5 text-[0.55rem]"}`}>
        ✦ Milwaukee · Wis ✦
      </span>
    </Link>
  );
}
