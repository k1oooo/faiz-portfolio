import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <section className="grid gap-12 px-4 pb-24 pt-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:px-5 md:pb-32 md:pt-36">
      <div data-reveal className="md:sticky md:top-32 md:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
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
      </div>

      <div>
        <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">About</span>
          </span>
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed md:mt-12 md:text-xl">
          <p data-reveal className="text-fg">
            I&apos;m Faiz, a full stack web developer from Kuala Lumpur.
          </p>
          <p data-reveal>
            I&apos;m 22 and in my second year of a BSc in Artificial Intelligence
            at UTMKL. I build websites that look good, are easy to use and turn
            visitors into customers.
          </p>
          <p data-reveal>
            I work with Next.js, TypeScript and Tailwind CSS, add motion with
            GSAP, design in Figma, and ship on Vercel with Supabase when a
            project needs data.
          </p>
          <p data-reveal>
            I&apos;m also a co-founder of Vici.
          </p>
        </div>
      </div>
    </section>
  );
}
