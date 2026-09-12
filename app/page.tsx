import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Showcase from "@/components/sections/Showcase";
import TrustSignals from "@/components/sections/TrustSignals";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Work />
      <Skills />
      <Showcase />
      <TrustSignals />
      <Contact />
      <Footer />
    </main>
  );
}
