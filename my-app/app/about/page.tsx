import Image from "next/image";
import { site } from "@/data/site";
import TechStack from "@/components/TechStack";
import HowIWork from "@/components/HowIWork";

export const metadata = { title: "About | Faiz" };

export default function About() {
  return (
    <main className="px-5">
      {/* First view: one full-height screen, like the reference */}
      <section className="flex min-h-svh flex-col gap-10 pb-[10svh] pt-[22svh] md:grid md:h-svh md:min-h-[640px] md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-x-5 md:gap-y-0 md:pb-[19svh] md:pt-[18svh]">
        <h1 className="mega md:col-span-9 md:row-start-1">
          Hey
          <span aria-hidden className="ml-[0.03em] inline-block h-[0.1em] w-[0.1em] bg-accent" />
          <span className="sr-only">.</span>
        </h1>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1 md:self-start">
          <Image
            src="/images/me.jpeg"
            alt="Portrait of Faiz Fahmi"
            fill
            priority
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <p className="lead md:col-span-6 md:row-start-2 md:self-end">{site.bio}</p>
      </section>
      <section className="pb-28">
        <p className="label mb-3">MY TECH STACK</p>
        <TechStack items={site.stack} />
      </section>
      <HowIWork />
    </main>
  );
}
