import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

/**
 * Fits exactly one screen: the photo takes whatever height is left and the
 * text scales with the screen height, so the page never overflows.
 */
export default function About() {
  return (
    <section className="flex min-h-svh flex-col gap-6 px-4 pb-6 pt-24 md:grid md:h-svh md:min-h-[34rem] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:grid-rows-[minmax(0,1fr)] md:gap-10 md:px-5 md:pb-5">
      <div
       
        className="relative min-h-40 flex-1 overflow-hidden rounded-2xl bg-surface md:min-h-0"
      >
        {/* Replace public/about/faiz.svg with your photo (any name, update src) */}
        <Image
          src="/about/faiz.svg"
          alt={`Photo of ${site.name}`}
          fill
          unoptimized
          priority
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex shrink-0 flex-col gap-6 md:min-h-0 md:justify-between md:gap-0">
        <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block">About</span>
          </span>
        </h1>

        <div className="space-y-3 text-base leading-relaxed md:space-y-[2svh] md:text-[clamp(1rem,2.4svh,1.375rem)]">
          <p className="text-fg">
            I&apos;m Faiz, a full stack web developer from Kuala Lumpur.
          </p>
          <p>
            I&apos;m 22 and in my second year of a BSc in Artificial Intelligence
            at UTMKL. I build websites that look good, are easy to use and turn
            visitors into customers.
          </p>
          <p>
            I work with Next.js, TypeScript and Tailwind CSS, add motion with
            GSAP, design in Figma, and ship on Vercel with Supabase when a
            project needs data.
          </p>
          <p>
            I&apos;m also a co-founder of Vici.
          </p>
        </div>
      </div>
    </section>
  );
}
