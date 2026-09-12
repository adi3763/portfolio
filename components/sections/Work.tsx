"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site, type Project } from "@/lib/site";
import { useMediaQuery } from "@/lib/useMediaQuery";

const PANEL_VH = 150;

const scrolledVh = (progress: number) => progress * (PANEL_VH + 100) - 100;

function ProjectCard({ project }: { project: Project }) {
  const content = project.image ? (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(min-width: 768px) 26vw, 92vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    <div className="flex size-full flex-col justify-between bg-neutral-100 p-6 text-black lg:p-8">
      <span className="text-xs font-medium text-neutral-500">{project.category}</span>
      <div>
        <p className="text-2xl leading-tight font-semibold lg:text-3xl">{project.title}</p>
        <p className="mt-2 text-xs text-neutral-500">Screenshot goes here</p>
      </div>
    </div>
  );

  const className =
    "group relative block w-full overflow-hidden rounded-[1.4rem] bg-white";

  return project.href ? (
    <a href={project.href} className={className} style={{ aspectRatio: project.aspect }}>
      {content}
    </a>
  ) : (
    <div className={className} style={{ aspectRatio: project.aspect }}>
      {content}
    </div>
  );
}

export default function Work() {
  const panel = useRef<HTMLDivElement>(null);
  const animate = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: panel,
    offset: ["start end", "end start"],
  });
  const outerY = useTransform(scrollYProgress, (p) => `${1.05 * scrolledVh(p) - 7}vh`);
  const middleY = useTransform(scrollYProgress, (p) => `${0.2 * scrolledVh(p) + 2}vh`);

  const columns = [0, 1, 2].map((col) =>
    site.projects.filter((_, i) => i % 3 === col),
  );

  return (
    <section id="work" aria-label="Selected work" className="py-16 md:py-24">
      <div
        ref={panel}
        className="relative w-full rounded-[2rem] bg-[#1D1D1F] py-6 md:h-[150vh] md:overflow-hidden md:rounded-[2.75rem] md:py-0"
      >
        <div className="mx-auto flex w-[92%] flex-col gap-4 md:grid md:w-[79%] md:grid-cols-3 md:items-start md:gap-[1.4%]">
          {columns.map((cards, col) => (
            <motion.div
              key={col}
              style={animate ? { y: col === 1 ? middleY : outerY } : undefined}
              className="flex flex-col gap-4 md:gap-6 md:will-change-transform"
            >
              {cards.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
