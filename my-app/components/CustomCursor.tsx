"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Anything with a hover effect: links, buttons, cards and tiles marked with the
// Tailwind `group` class, and anything tagged with data-cursor.
const HOVERABLE = "a, button, summary, label, .group, [data-cursor]";
const ACCENT = "#ff4d00";
const GRAY = "#737373";

/**
 * Replaces the system cursor with a small accent-colored circle that follows the mouse.
 * Over anything that has a hover effect it shrinks and turns gray. Only used with a
 * real mouse; touch screens keep their normal behaviour.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1, backgroundColor: ACCENT });
    const moveX = gsap.quickTo(dot, "x", { duration: reduce ? 0 : 0.2, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: reduce ? 0 : 0.2, ease: "power3" });

    let hovering = false;
    let visible = false;

    const setHover = (next: boolean) => {
      if (next === hovering) return;
      hovering = next;
      gsap.to(dot, {
        scale: next ? 0.45 : 1,
        backgroundColor: next ? GRAY : ACCENT,
        duration: reduce ? 0 : 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const show = (on: boolean) => {
      if (on === visible) return;
      visible = on;
      gsap.to(dot, { opacity: on ? 1 : 0, duration: 0.2, overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      show(true);
      moveX(e.clientX);
      moveY(e.clientY);
      const target = e.target as Element | null;
      setHover(!!target?.closest?.(HOVERABLE));
    };
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      html.classList.remove("has-custom-cursor");
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full bg-accent opacity-0"
    />
  );
}
