"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/lib/site";

const lines = ["Websites people", "love to use,", "built to convert."];

export function HeroHeadline() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".rise > span"),
        { yPercent: 105, autoAlpha: 1 },
        { yPercent: 0, autoAlpha: 1, duration: 1.3, stagger: 0.12, delay: 0.1, ease: "power4.out" },
      );
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el.querySelectorAll(".rise > span"), { yPercent: 0, autoAlpha: 1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <h1 ref={root} className="hero-title" aria-label={site.headline}>
      {lines.map((l) => (
        <span key={l} className="rise" aria-hidden>
          <span>{l}</span>
        </span>
      ))}
    </h1>
  );
}
