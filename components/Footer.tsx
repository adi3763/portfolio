"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUp, ArrowUpRight, Download, Heart } from "lucide-react";
import { useLenis } from "lenis/react";
import { useRef, type ReactNode } from "react";
import { site } from "@/lib/site";

function Reveal({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const [start, end] = range;
  const amount = (p: number) => Math.min(Math.max((p - start) / (end - start), 0), 1);
  const opacity = useTransform(progress, (p) => amount(p));
  const y = useTransform(progress, (p) => (1 - amount(p)) * 40);
  const filter = useTransform(progress, (p) => `blur(${(1 - amount(p)) * 8}px)`);
  return (
    <motion.div style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.div>
  );
}

function Ribbon() {
  const items = [...site.footer.ribbon, ...site.footer.ribbon];
  return (
    <div className="-mx-10 -rotate-2 border-y border-white/10 bg-white/[0.03] py-4 backdrop-blur-sm">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((text, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="px-8 text-xs font-medium tracking-[0.35em] whitespace-nowrap text-white/60 uppercase md:text-sm">
                  {text}
                </span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end end"] });
  const wordmarkY = useTransform(scrollYProgress, (p) => `${(1 - p) * 35}%`);
  const year = new Date().getFullYear();

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={container}
      className="relative h-[clamp(40rem,92svh,52rem)]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="fixed bottom-0 left-0 flex h-[clamp(40rem,92svh,52rem)] w-full flex-col overflow-hidden bg-[#070707]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(80% 70% at 50% 40%, #000 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(80% 70% at 50% 40%, #000 30%, transparent 85%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: "radial-gradient(55% 60% at 50% 100%, rgba(179,38,42,0.35), transparent 70%)" }}
        />
        <motion.div
          aria-hidden
          style={{ y: wordmarkY }}
          className="pointer-events-none absolute inset-x-0 bottom-[-0.18em] text-center text-[clamp(5rem,17vw,19rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
        >
          {site.name}
        </motion.div>

        <div className="relative pt-10 md:pt-14">
          <Reveal progress={scrollYProgress} range={[0.05, 0.5]}>
            <Ribbon />
          </Reveal>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <Reveal progress={scrollYProgress} range={[0.25, 0.7]}>
            <h2 className="bg-gradient-to-b from-white via-white to-neutral-600 bg-clip-text pb-2 text-[clamp(3rem,8.5vw,8.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-transparent">
              {site.footer.heading}
            </h2>
          </Reveal>

          <Reveal progress={scrollYProgress} range={[0.4, 0.82]} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={site.footer.primary.href}
              className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-7 text-base font-medium text-white transition-all duration-300 hover:bg-[#c51208] hover:shadow-[0_12px_40px_-8px_rgba(227,23,10,0.7)]"
            >
              {site.footer.primary.label}
              <span className="grid size-10 place-items-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </a>
            <a
              href={site.contact.resume.href}
              download
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pr-2 pl-7 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08]"
            >
              {site.contact.resume.label}
              <span className="grid size-10 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-y-0.5 group-hover:bg-white group-hover:text-black">
                <Download className="size-5" aria-hidden />
              </span>
            </a>
          </Reveal>

          <Reveal progress={scrollYProgress} range={[0.55, 0.92]}>
            <nav aria-label="Footer" className="mt-8 flex flex-wrap justify-center gap-3">
              {site.footer.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        <Reveal
          progress={scrollYProgress}
          range={[0, 0.4]}
          className="relative mx-auto flex w-[90%] flex-col items-center gap-4 pb-8 md:grid md:grid-cols-[1fr_auto_1fr] md:pb-10"
        >
          <p className="text-center text-xs tracking-[0.2em] text-white/50 uppercase md:justify-self-start md:text-left">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs tracking-[0.2em] text-white/60 uppercase backdrop-blur-sm">
            Crafted with <Heart className="size-4 fill-accent text-accent" aria-label="love" /> by
            <span className="font-semibold tracking-normal text-white normal-case">{site.name}</span>
          </p>
          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className="grid size-12 place-items-center rounded-full border border-white/15 text-white/70 transition-all md:justify-self-end duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:text-black"
          >
            <ArrowUp className="size-5" aria-hidden />
          </button>
        </Reveal>
      </footer>
    </div>
  );
}
