import { site } from "@/lib/site";

function Avatar() {
  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <span className="relative -top-[0.08em] ml-[0.2em] inline-grid size-[0.72em] place-items-center overflow-hidden rounded-full border-2 border-white/80 bg-neutral-700 align-middle">
      {site.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.avatar} alt="" className="size-full object-cover" />
      ) : (
        <span className="text-[0.22em] font-medium text-white">{initials}</span>
      )}
    </span>
  );
}

function ObjectSlot() {
  return (
    <div className="flex flex-col items-center">
      <div
        data-slot="hero-3d-object"
        className="grid aspect-square w-48 place-items-center rounded-full border border-dashed border-white/25 sm:w-64 lg:w-[21rem]"
      >
        <span className="px-8 text-center text-xs text-white/40">
          {site.hero.objectCaption}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero, nav } = site;
  const words = hero.headline.line1.split(" ");
  const lastWord = words.pop();
  const lead = words.join(" ");

  return (
    <section id="hero" className="relative isolate min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 85% at 56% -12%, #b3262a 0%, #912022 24%, #5a1315 46%, #230809 68%, #000 92%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 7px)",
          maskImage: "radial-gradient(60% 70% at 70% 0%, #000 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(60% 70% at 70% 0%, #000 0%, transparent 80%)",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto flex min-h-svh max-w-[110rem] flex-col px-6 sm:px-10 lg:px-[6.75%]">
        <header className="flex items-center justify-between py-6 lg:py-8">
          <a href="#hero" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight lg:text-2xl">
            <span className="grid size-7 place-items-center rounded-md bg-white text-sm font-bold text-black lg:size-8">
              {site.name[0]}
            </span>
            {site.name}
          </a>
          <nav className="flex items-center gap-8">
            <a
              href={nav.link.href}
              className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
            >
              {nav.link.label}
            </a>
            <a
              href={nav.button.href}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85 lg:px-8 lg:text-base"
            >
              {nav.button.label}
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 pb-20 pt-6 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-[clamp(3rem,6vw,8rem)] lg:pb-24">
          <ObjectSlot />

          <div>
            <p className="text-sm font-medium text-white/90 sm:text-base lg:text-lg">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(2.4rem,5vw,6rem)] leading-[1.22] font-normal tracking-[-0.02em]">
              <span className="block">
                {lead}{" "}
                <span className="whitespace-nowrap">
                  {lastWord}
                  <Avatar />
                </span>
              </span>
              <span className="block">
                {hero.headline.line2.white}{" "}
                <span className="bg-gradient-to-r from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                  {hero.headline.line2.grey}
                </span>
              </span>
              <span className="block bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-transparent">
                {hero.headline.line3}
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10 lg:mt-14">
              <a
                href={hero.cta.href}
                className="w-fit rounded-full bg-accent px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#c51208] lg:text-lg"
              >
                {hero.cta.label}
              </a>
              <p className="text-sm leading-relaxed text-muted lg:text-lg">
                {hero.note[0]}
                <br />
                {hero.note[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
