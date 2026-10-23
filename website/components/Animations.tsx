"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mark things up in the pages and this does the motion:
 *  data-hero-line  → headline lines slide up on load
 *  data-parallax   → drifts slightly while scrolling away
 *  data-reveal     → fades up when scrolled into view
 */
export default function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      if (lines.length) {
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.1,
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
