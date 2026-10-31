import Image from "next/image";
import { site } from "@/data/site";
import TechStack from "@/components/TechStack";
import HowIWork from "@/components/HowIWork";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About | Faiz" };

export default function About() {
  return (
    <main className="px-5">
      {/* First view: one full-height screen, like the reference */}
      <section className="md:grid md:h-svh md:min-h-[640px] md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-x-5 md:gap-y-0 md:pb-[19svh] md:pt-[18svh]">
        {/* Mobile: heading + a photo that fills the rest of the first screen. Desktop: these join the grid. */}
        <div className="flex h-svh min-h-[560px] flex-col gap-[8svh] pb-[3svh] pt-[20svh] md:contents">
          <Reveal
            as="h1"
            className="mega shrink-0 md:col-span-9 md:row-start-1"
          >
            Hey
            <span
              aria-hidden
              className="ml-[0.03em] inline-block h-[0.1em] w-[0.1em] bg-accent"
            />
            <span className="sr-only">.</span>
          </Reveal>
          <Reveal
            delay={0.15}
            className="group relative min-h-0 w-full flex-1 overflow-hidden bg-charcoal md:aspect-[3/4] md:flex-none md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1 md:self-start"
          >
            <Image
              src="/images/me-bw.jpeg"
              alt="Portrait of Faiz Fahmi"
              fill
              priority
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover object-[50%_40%] transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </Reveal>
        </div>
        <Reveal
          as="p"
          delay={0.3}
          className="lead pb-[10svh] pt-10 md:col-span-6 md:row-start-2 md:self-end md:p-0"
        >
          {site.bio}
        </Reveal>
      </section>
      <section className="pb-28">
        <Reveal as="p" className="label mb-3">
          MY TECH STACK
        </Reveal>
        <Reveal delay={0.1}>
          <TechStack items={site.stack} />
        </Reveal>
      </section>
      <HowIWork />
    </main>
  );
}
