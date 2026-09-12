import Image from "next/image";
import { Plus } from "lucide-react";
import { site, type ShowcaseProject } from "@/lib/site";

function ProjectCard({ project }: { project: ShowcaseProject }) {
  const card = (
    <>
      <div className="rounded-[1.6rem] bg-[#161616] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.06]">
        <div className="relative aspect-[0.88] overflow-hidden rounded-[1.1rem] bg-neutral-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {project.isNew && (
            <span className="absolute top-4 right-4 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold tracking-wide text-white">
              NEW
            </span>
          )}
        </div>
      </div>
      <h3 className="mt-7 text-center text-xl font-normal text-white lg:text-2xl">{project.title}</h3>
    </>
  );

  return project.href ? (
    <a href={project.href} className="group block">
      {card}
    </a>
  ) : (
    <div className="group">{card}</div>
  );
}

export default function Showcase() {
  const { showcase } = site;

  return (
    <section id="projects" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-[92%] text-center">
        <div
          aria-hidden
          className="text-[clamp(7rem,19vw,22rem)] leading-[0.85] font-semibold tracking-[-0.03em] text-transparent select-none [-webkit-text-stroke:2px_rgba(255,255,255,0.5)] [mask-image:linear-gradient(to_bottom,#000_40%,transparent_95%)]"
        >
          {showcase.count}
        </div>
        <h2 className="relative -mt-[clamp(1.5rem,3vw,3.5rem)] text-[clamp(2.5rem,6.2vw,7.5rem)] leading-[1.05] font-normal tracking-[-0.02em]">
          {showcase.heading}
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-14 gap-y-4 md:mt-10">
          {showcase.highlights.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-base text-white md:text-xl">
              <span
                className="grid size-6 place-items-center rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Plus className="size-3.5 text-black" strokeWidth={3} aria-hidden />
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 grid w-[92%] gap-x-[2.7%] gap-y-14 sm:grid-cols-2 md:mt-20 lg:w-[95%] lg:grid-cols-3">
        {showcase.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
