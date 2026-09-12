import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import TrustSignals from "@/components/sections/TrustSignals";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Work />
      <Process />
      <TrustSignals />
      <Contact />
    </main>
  );
}
