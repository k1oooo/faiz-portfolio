"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/lib/work";

gsap.registerPlugin(ScrollTrigger);

const label = "text-[15px] font-semibold text-neutral-950";
const muted = "text-[#6b6b6b]";

// Scroll distances, in "screen widths" of scrolling.
const HOLD_START = 0.6; // stay on the first project for a bit before sliding
const HOLD_BETWEEN = 0.35; // pause on each project once it has slid in
const HOLD_END = 0.35; // pause on the last project before the page continues

/**
 * Desktop: the section pins to the screen, rests on the first project,
 * then slides left to reveal the next one as you keep scrolling.
 * Mobile: a normal stacked list.
 */
export default function WorkShowcase() {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (works.length < 2) return;
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const count = works.length;
        const total =
          HOLD_START + (count - 1) + (count - 2) * HOLD_BETWEEN + HOLD_END;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapper.current,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${total * window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: HOLD_START });
        for (let i = 1; i < count; i++) {
          tl.to(track.current, {
            x: () => -i * window.innerWidth,
            duration: 1,
            ease: "power2.inOut",
          });
          tl.to({}, { duration: i === count - 1 ? HOLD_END : HOLD_BETWEEN });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapper} className="overflow-hidden md:h-svh">
      <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row">
        {works.map((work, i) => (
          <article
            key={work.slug}
            className="grid gap-8 px-4 pb-14 pt-14 first:pt-28 md:h-svh md:w-screen md:grid-cols-[3fr_4fr_3fr] md:gap-0 md:p-0 md:first:pt-0"
          >
            {/* Left: title, description, timeline */}
            <div className="order-2 flex flex-col justify-between gap-10 md:order-none md:border-r md:border-black/10 md:px-5 md:pb-12 md:pt-24">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-[30px]">
                  <Link
                    href={`/${work.slug}`}
                    className="transition-opacity duration-300 hover:opacity-60"
                  >
                    {work.title}
                  </Link>
                </h2>
                <p className={`mt-6 max-w-[26rem] text-[17px] leading-[1.75] ${muted}`}>
                  {work.summary}
                </p>
              </div>
              {work.timeline && (
                <div>
                  <p className={label}>Project Timeline</p>
                  <p className={`mt-2 text-[17px] ${muted}`}>{work.timeline}</p>
                </div>
              )}
            </div>

            {/* Middle: tall image */}
            <Link
              href={`/${work.slug}`}
              aria-label={`Open ${work.title}`}
              className="order-1 flex justify-center md:order-none md:items-end md:pb-12 md:pt-24"
            >
              <div className="group relative aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-neutral-200 md:h-[calc(100svh-9rem)] md:w-auto md:max-w-[82%] md:aspect-[27/35]">
                <Image
                  src={work.image}
                  alt={`${work.title} website`}
                  fill
                  unoptimized
                  priority={i === 0}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </Link>

            {/* Right: role, tools */}
            <div className="order-3 flex flex-col justify-between gap-10 md:order-none md:border-l md:border-black/10 md:px-5 md:pb-12 md:pt-24">
              <div>
                <p className={label}>Role</p>
                <p className={`mt-3 text-[17px] ${muted}`}>{work.role}</p>
              </div>
              <div>
                <p className={label}>Tools</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {work.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-xl bg-neutral-200/80 px-3 py-2 text-sm text-neutral-700 transition-colors duration-300 hover:bg-neutral-300"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
