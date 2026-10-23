"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Layers, Braces, Wind, Zap, Database, PenTool, Triangle } from "lucide-react";
import { stack } from "@/lib/site";

const icons = { Layers, Braces, Wind, Zap, Database, PenTool, Triangle };

function Row({ hidden = false, compact = false }: { hidden?: boolean; compact?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {stack.map((s) => {
        const Icon = icons[s.icon];
        return (
          <span key={s.name} className={compact ? "marquee-item meta !gap-2 !pr-8" : "marquee-item headline"}>
            <Icon className={compact ? "h-3.5 w-3.5" : "h-[0.8em] w-[0.8em]"} strokeWidth={1.5} />
            {s.name}
          </span>
        );
      })}
    </div>
  );
}

export function StackMarquee({ compact = false }: { compact?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(el, {
        xPercent: -50,
        duration: compact ? 28 : 36,
        ease: "none",
        repeat: -1,
      });
      const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      el.addEventListener("pointerenter", slow);
      el.addEventListener("pointerleave", fast);
      return () => {
        el.removeEventListener("pointerenter", slow);
        el.removeEventListener("pointerleave", fast);
      };
    });
    return () => mm.revert();
  }, [compact]);

  return (
    <div className="overflow-hidden" role="region" aria-label="Tech stack">
      <div ref={track} className="flex w-max">
        <Row compact={compact} />
        <Row hidden compact={compact} />
      </div>
    </div>
  );
}
