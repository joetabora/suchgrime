"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-line bg-card font-goth text-5xl text-line">
        SuchGrime
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl border border-line bg-card">
        <Image src={images[active]} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
                i === active ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
