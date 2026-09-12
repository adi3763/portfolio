"use client";

import { Quote, Star } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import type { Testimonial } from "@/lib/site";

export default function TestimonialCard({ item }: { item: Testimonial }) {
  const card = useRef<HTMLElement>(null);

  const initials = item.name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const el = card.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <figure
      ref={card}
      onPointerMove={trackPointer}
      className="group/card relative flex min-h-[25rem] w-[clamp(17rem,24vw,23rem)] flex-col justify-between overflow-hidden bg-white p-7 text-black transition-[transform,box-shadow,color] duration-500 ease-out hover:-translate-y-3 hover:text-white hover:shadow-[0_30px_80px_-20px_rgba(227,23,10,0.55)] md:min-h-[28rem] md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 0%, #b3262a 0%, #5a1315 45%, #0d0d0d 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.16), transparent 65%)",
        }}
      />
      <Quote
        aria-hidden
        className="pointer-events-none absolute top-6 right-6 size-16 scale-50 rotate-12 fill-white/10 text-white/15 opacity-0 transition-all duration-500 ease-out group-hover/card:scale-100 group-hover/card:rotate-0 group-hover/card:opacity-100"
      />

      <div className="relative">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className="size-4 fill-accent text-accent transition-colors duration-500 group-hover/card:fill-white group-hover/card:text-white"
              style={{ transitionDelay: `${i * 40}ms` }}
              aria-hidden
            />
          ))}
        </div>
        <blockquote className="mt-6 text-lg leading-relaxed md:text-xl">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="relative mt-8 flex items-center gap-4 border-t border-black/10 pt-6 transition-colors duration-500 group-hover/card:border-white/15">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ring-0 ring-white/40 transition-all duration-500 ease-out group-hover/card:scale-110 group-hover/card:ring-4"
          style={{ backgroundColor: item.color }}
        >
          {initials}
        </span>
        <span>
          <span className="block font-medium">{item.name}</span>
          <span className="block text-sm text-neutral-500 transition-colors duration-500 group-hover/card:text-white/70">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
