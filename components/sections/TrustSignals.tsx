import TestimonialCard from "@/components/TestimonialCard";
import { site } from "@/lib/site";

export default function TrustSignals() {
  const { testimonials } = site;
  const loop = [...testimonials.items, ...testimonials.items];

  return (
    <section id="testimonials" className="overflow-hidden py-24 md:py-32">
      <div className="px-6 text-center">
        <p className="text-sm text-white/80 md:text-base">{testimonials.eyebrow}</p>
        <h2 className="mt-3 text-[clamp(2.5rem,5vw,5.5rem)] leading-[1.1] font-normal tracking-[-0.02em]">
          {testimonials.heading}
        </h2>
      </div>

      <div className="group mt-12 pt-4 pb-10 md:mt-16">
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              aria-hidden={i >= testimonials.items.length}
              className="pr-5"
            >
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
