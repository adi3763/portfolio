"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CodeXml, Database, Gauge, Headphones, Server, Smartphone } from "lucide-react";
import { useRef } from "react";
import { site, type Skill } from "@/lib/site";

const icons: Record<Skill["icon"], typeof CodeXml> = {
  code: CodeXml,
  server: Server,
  database: Database,
  gauge: Gauge,
  smartphone: Smartphone,
  headphones: Headphones,
};

function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], ["#5c5c5c", "#ffffff"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export default function Skills() {
  const heading = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: heading,
    offset: ["start 85%", "end 45%"],
  });
  const words = site.skills.heading.split(" ");

  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="mx-auto grid w-[88%] gap-16 md:w-[79%] lg:grid-cols-[minmax(0,34%)_1fr] lg:gap-[8%]">
        <h2
          ref={heading}
          className="max-w-[11ch] text-[clamp(2.6rem,4.4vw,5.25rem)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          {words.map((word, i) => (
            <RevealWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
          ))}
        </h2>

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:gap-y-[4.5rem]">
          {site.skills.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title.join(" ")}>
                <span className="grid size-[3.75rem] place-items-center rounded-full border border-white/10 bg-[#0d0d0d]">
                  <Icon className="size-6 text-white" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-xl leading-snug font-normal text-white lg:text-2xl">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>
                <p className="mt-3 text-base text-muted lg:text-lg">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
