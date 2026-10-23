"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/work";

export function WorkList({ items }: { items: Project[] }) {
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bubble.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const on = () => bubble.current?.setAttribute("data-on", "");
  const off = () => bubble.current?.removeAttribute("data-on");

  return (
    <>
      <ul className="work-list" onPointerLeave={off}>
        {items.map((p, i) => (
          <li key={p.slug} className="work-row rule-soft">
            <Link
              href={`/${p.slug}`}
              className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[4rem_1fr_12rem_5rem_2rem] sm:py-8"
              onPointerEnter={on}
            >
              <span className="meta text-black/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="title headline">{p.title}</span>
              <span className="meta hidden text-black/60 sm:block">
                {p.discipline}
              </span>
              <span className="meta hidden text-black/60 sm:block">
                {p.year}
              </span>
              <ArrowUpRight className="arrow h-5 w-5 justify-self-end self-center" />
            </Link>
          </li>
        ))}
        <li className="rule-soft" aria-hidden />
      </ul>
      <div ref={bubble} className="cursor-bubble meta" aria-hidden>
        View
      </div>
    </>
  );
}
