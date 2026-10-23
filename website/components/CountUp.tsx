"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CountUp({ to, decimals = 2 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { v: 0 };
      el.textContent = (0).toFixed(decimals);
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = obj.v.toFixed(decimals);
        },
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });
    return () => mm.revert();
  }, [to, decimals]);

  return <span ref={ref}>{to.toFixed(decimals)}</span>;
}
