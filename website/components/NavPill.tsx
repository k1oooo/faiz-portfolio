"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { works } from "@/lib/work";

function activeHref(pathname: string) {
  if (pathname === "/about") return "/about";
  if (pathname === "/process") return "/process";
  if (pathname === "/" || works.some((w) => pathname === `/${w.slug}`))
    return "/#work";
  return null;
}

export default function NavPill() {
  const pathname = usePathname();
  // set on click so the highlight starts sliding right away,
  // not after the next page has finished loading
  const [pending, setPending] = useState<string | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    // the new page has arrived, so the real route takes over
    setSeenPath(pathname);
    setPending(null);
  }
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const items = useRef<Record<string, HTMLLIElement | null>>({});

  const current = pending ?? activeHref(pathname);
  // the highlight only moves when a link is clicked
  const target = current;

  const measure = useCallback(() => {
    const el = target ? items.current[target] : null;
    setBox(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [target]);

  useEffect(() => {
    measure();
    // switch the slide on only after the first placement
    const id = requestAnimationFrame(() => setAnimate(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 lg:bottom-auto lg:top-[14px]"
    >
      <ul
        className="relative grid auto-cols-fr grid-flow-col rounded-full border border-white/25 bg-neutral-800/50 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150"
      >
        {/* sliding highlight, same width as every link */}
        <span
          aria-hidden
          className={`absolute inset-y-1 rounded-full border border-white/30 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-sm ${
            animate
              ? "transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
              : ""
          }`}
          style={{
            left: box?.left ?? 0,
            width: box?.width ?? 0,
            opacity: box ? 1 : 0,
          }}
        />
        {nav.map((item) => (
          <li
            key={item.label}
            ref={(el) => {
              items.current[item.href] = el;
            }}
            className="relative"
          >
            <Link
              href={item.href}
              onClick={() => setPending(item.href)}
              aria-current={current === item.href ? "page" : undefined}
              className={`block rounded-full px-5 py-1.5 text-center text-[13px] font-semibold text-white transition-opacity duration-300 md:px-6 ${
                target === item.href ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
