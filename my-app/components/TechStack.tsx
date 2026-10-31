"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { stackIcons } from "@/data/stack-icons";

// Desktop: the first tiles are large (one row of three), the rest small (one row of seven).
// Mobile: every tile is the same size, two per row.
const LARGE = 3;

// Wordmarks are wide and short, so they look small next to square icons; scale them up.
const SCALE: Record<string, number> = { GSAP: 1.5 };

/**
 * Icon-only tech stack. A single black block sits behind the icons and glides (and
 * resizes) to whichever tile is hovered, then returns to the first tile on leave.
 * The hovered tile's icon turns white and a small tooltip shows its name.
 */
export default function TechStack({ items }: { items: string[] }) {
  const gridRef = useRef<HTMLUListElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const current = useRef(0);
  const [active, setActive] = useState(0); // tile the black block is on
  const [hovered, setHovered] = useState<number | null>(null); // tile showing a tooltip

  const moveTo = (index: number, animate = true) => {
    const grid = gridRef.current;
    const tile = tiles.current[index];
    const block = blockRef.current;
    if (!grid || !tile || !block) return;
    current.current = index;
    setActive(index);
    // Measure with bounding boxes so fractional tile sizes line up exactly.
    const g = grid.getBoundingClientRect();
    const t = tile.getBoundingClientRect();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.to(block, {
      x: t.left - g.left,
      y: t.top - g.top,
      width: t.width,
      height: t.height,
      duration: animate && !reduce ? 0.5 : 0,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // Keep the block aligned with its tile when the layout changes size.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new ResizeObserver(() => moveTo(current.current, false));
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // Mobile: there is no hover, so scrolling drives the black block from tile to tile.
  const scrollMode = useRef(false);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const count = items.length;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!scrollMode.current) return;
      const r = grid.getBoundingClientRect();
      // Progress of a reference line (a bit below the middle of the screen) down the grid.
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      const index = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
      if (index !== current.current) {
        setHovered(index);
        moveTo(index);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onModeChange = () => {
      scrollMode.current = mq.matches;
      if (mq.matches) {
        update();
      } else {
        setHovered(null);
        moveTo(0, false);
      }
    };
    scrollMode.current = mq.matches;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onModeChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onModeChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <ul
      ref={gridRef}
      className="relative grid grid-cols-2 md:grid-cols-21"
      onPointerLeave={() => {
        if (scrollMode.current) return;
        setHovered(null);
        moveTo(0);
      }}
    >
      {/* Black block: starts on the first (large) tile, which is a third of the width at 3:2 */}
      <div
        ref={blockRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 aspect-square w-1/2 bg-ink md:aspect-[3/2] md:w-1/3"
      />
      {items.map((name, i) => {
        const large = i < LARGE;
        return (
          <li
            key={name}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            onPointerEnter={() => {
              if (scrollMode.current) return;
              setHovered(i);
              moveTo(i);
            }}
            data-cursor
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className={`relative flex items-center justify-center transition-colors duration-300 ${
              active === i ? "text-paper" : "text-ink"
            } ${
              "col-span-1 aspect-square " +
              (large
                ? "md:col-span-7 md:aspect-[3/2]"
                : "md:col-span-3 md:aspect-square")
            }`}
          >
            <svg
              role="img"
              aria-label={name}
              viewBox="0 0 24 24"
              fill="currentColor"
              style={
                SCALE[name] ? { transform: `scale(${SCALE[name]})` } : undefined
              }
              className={
                "h-14 w-14 " +
                (large
                  ? "md:h-[clamp(3rem,6vw,7rem)] md:w-[clamp(3rem,6vw,7rem)]"
                  : "md:h-[clamp(2rem,4.2vw,5rem)] md:w-[clamp(2rem,4.2vw,5rem)]")
              }
            >
              <path d={stackIcons[name]} />
            </svg>
            <span
              role="tooltip"
              aria-hidden={hovered !== i}
              className={`pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm bg-accent px-2 py-1 text-[13px] font-medium leading-none text-ink transition-opacity duration-200 ${
                hovered === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
