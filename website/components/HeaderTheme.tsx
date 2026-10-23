"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

// Anything noticeably lighter than near-black counts as "not black".
const LIGHT_LUMA = 0.2;

/**
 * Keeps the site header readable on any background:
 * black background -> white header, any other background -> black header.
 *
 * It sets data-header-theme on the top-level <header> (the colors live in
 * globals.css), so it works no matter how Header.tsx is written. It looks at
 * what sits under the middle of the header on scroll. An element (or any
 * parent) can force the answer with data-header="light" | "dark", which is how
 * project images are handled. Otherwise the first opaque background color
 * found going up the tree decides.
 */
export default function HeaderTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("body > header");
    if (!header) return;

    // a 1px canvas reads any CSS color (including oklch) back as plain RGBA
    const ctx = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.canvas.width = 1;
    ctx.canvas.height = 1;

    const read = (css: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };

    const themeAt = (start: Element): Theme | null => {
      for (let el: Element | null = start; el; el = el.parentElement) {
        const flag = (el as HTMLElement).dataset?.header;
        if (flag === "light" || flag === "dark") return flag;
        const { r, g, b, a } = read(getComputedStyle(el).backgroundColor);
        if (a > 0.5) {
          const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          return luma > LIGHT_LUMA ? "light" : "dark";
        }
      }
      return null;
    };

    const apply = (theme: Theme) => {
      if (header.dataset.headerTheme !== theme) header.dataset.headerTheme = theme;
    };

    const detect = () => {
      const y = Math.max(1, header.offsetHeight / 2);
      const x = Math.max(1, window.innerWidth / 2);
      for (const el of document.elementsFromPoint(x, y)) {
        // ignore the header itself and the floating nav pill
        if (header.contains(el) || el.closest('nav[aria-label="Main"]')) continue;
        const found = themeAt(el);
        if (found) return apply(found);
      }
      apply("dark");
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(detect);
    };

    schedule();
    // layout can still be settling right after a page change
    const settle = window.setTimeout(schedule, 300);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
