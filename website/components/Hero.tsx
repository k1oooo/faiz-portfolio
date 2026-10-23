"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Brain, Download, GraduationCap, Rocket } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { StackMarquee } from "@/components/StackMarquee";
import { site } from "@/lib/site";

const lines = ["Websites people", "love to use,", "built to convert."];

const btn =
  "press group inline-flex items-center gap-2 border border-black px-4 py-2.5 text-sm font-semibold transition-colors duration-300";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        el.querySelectorAll(".rise > span"),
        { yPercent: 105, autoAlpha: 1 },
        { yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.12, delay: 0.1 },
      ).fromTo(
        el.querySelectorAll(".hero-fade"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
        "-=0.7",
      );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el.querySelectorAll(".rise > span"), { yPercent: 0, autoAlpha: 1 });
      gsap.set(el.querySelectorAll(".hero-fade"), { autoAlpha: 1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="flex h-[calc(100svh-4.25rem)] min-h-[34rem] flex-col"
    >
      <div className="wrap flex flex-1 flex-col justify-between gap-4 pb-4 pt-[2svh]">
        <p className="meta hero-fade text-black/60">{site.role}, {site.location}</p>

        <h1 className="hero-title" aria-label={lines.join(" ")}>
          {lines.map((l) => (
            <span key={l} className="rise" aria-hidden>
              <span>{l}</span>
            </span>
          ))}
        </h1>

        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-10">
          <p className="hero-fade text-[clamp(0.95rem,0.5rem+1.3svh,1.25rem)] leading-snug">
            {site.intro}
          </p>
          <div className="hero-fade flex flex-wrap gap-2 lg:justify-end">
            <a
              href={site.resume}
              download
              className={`${btn} bg-black text-white hover:bg-white hover:text-black`}
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Resume
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`${btn} hover:bg-black hover:text-white`}
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.links.find((l) => l.label === "GitHub")?.href}
              target="_blank"
              rel="noreferrer"
              className={`${btn} hover:bg-black hover:text-white`}
            >
              GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <dl className="hero-fade rule grid grid-cols-3">
          <div className="flex items-start justify-between gap-2 py-3 pr-3">
            <div>
              <dt className="meta text-black/50">CGPA</dt>
              <dd className="stat mt-1 tabular-nums">
                <CountUp to={site.cgpa} />
              </dd>
            </div>
            <GraduationCap className="hidden h-5 w-5 sm:block" strokeWidth={1.5} />
          </div>
          <div className="flex items-start justify-between gap-2 border-l border-black/15 px-3 py-3 sm:px-6">
            <div>
              <dt className="meta text-black/50">UTMKL, Yr 2</dt>
              <dd className="stat mt-1">BSc AI</dd>
            </div>
            <Brain className="hidden h-5 w-5 sm:block" strokeWidth={1.5} />
          </div>
          <a
            href={site.vici.href}
            className="group flex items-start justify-between gap-2 border-l border-black/15 py-3 pl-3 sm:pl-6"
          >
            <div>
              <dt className="meta text-black/50">Co‑founder</dt>
              <dd className="stat mt-1">{site.vici.label}</dd>
            </div>
            <Rocket
              className="hidden h-5 w-5 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
              strokeWidth={1.5}
            />
          </a>
        </dl>
      </div>

      <div className="hero-fade rule-soft border-b border-black/15 py-3">
        <StackMarquee compact />
      </div>
    </section>
  );
}
