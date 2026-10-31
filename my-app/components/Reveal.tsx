"use client";
import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades its content in (with a small upward slide) as soon as it is on screen.
 * Content that is already visible on load animates straight away; content further
 * down the page animates once when it is scrolled into view. Use `delay` to stagger
 * neighbours, and `as` / `className` to keep the original element and its layout classes.
 *
 * It renders hidden (opacity 0) so there is no flash before GSAP takes over. Visitors
 * who prefer reduced motion just see the content.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 28,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  y?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        clearProps: "transform", // do not leave a transform behind once it has landed
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return createElement(as, { ref, className, style: { opacity: 0 } }, children);
}
