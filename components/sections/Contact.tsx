import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export default function Contact() {
  const { contact } = site;

  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{ background: "radial-gradient(60% 70% at 20% 100%, rgba(145,32,34,0.45), transparent 70%)" }}
      />
      <div className="mx-auto grid w-[88%] items-start gap-14 lg:w-[82%] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm text-white/80 md:text-base">{contact.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2.5rem,4.6vw,5rem)] leading-[1.08] font-normal tracking-[-0.02em]">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">{contact.intro}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
