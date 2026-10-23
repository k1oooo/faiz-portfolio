"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileDown } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import ContactMenu from "./ContactMenu";
import IconLink from "./IconLink";

type Theme = "dark" | "light";

// Anything noticeably lighter than near-black counts as "not black".
const LIGHT_LUMA = 0.2;

/**
 * Header that follows the background behind it:
 * black background -> white header, any other background -> black header.
 *
 * It looks at what sits under the middle of the header on scroll. An element
 * (or any parent) can force the answer with data-header="light" | "dark",
 * which is how project images are handled. Otherwise the first opaque
 * background color found going up the tree decides.
 */
export default function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
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

    const detect = () => {
      const header = ref.current;
      if (!header) return;
      const y = Math.max(1, header.offsetHeight / 2);
      const x = Math.max(1, window.innerWidth / 2);
      for (const el of document.elementsFromPoint(x, y)) {
        // ignore the header itself and the floating nav pill
        if (header.contains(el) || el.closest('nav[aria-label="Main"]')) continue;
        const found = themeAt(el);
        if (found) return setTheme(found);
      }
      setTheme("dark");
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

  return (
    <header
      ref={ref}
      data-header-theme={theme}
      className="fixed inset-x-0 top-0 z-50 text-(--hdr-fg)"
    >
      <div className="flex items-center justify-between gap-x-3 gap-y-1 px-4 py-2.5 sm:flex-wrap sm:gap-x-6 sm:px-5 sm:py-3 md:px-10 md:py-4">
        <Link
          href="/"
          className="whitespace-nowrap text-sm font-semibold tracking-tight sm:text-[15px]"
        >
          {site.name}
        </Link>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <IconLink href={site.linkedin} label="LinkedIn">
            <LinkedinIcon className="size-[17px]" />
          </IconLink>
          <IconLink href={site.github} label="GitHub">
            <GithubIcon className="size-[18px]" />
          </IconLink>
          <IconLink href={site.resume} label="Download resume" download>
            <FileDown className="size-[18px]" strokeWidth={1.75} />
          </IconLink>
          <ContactMenu />
        </div>
      </div>
    </header>
  );
}
