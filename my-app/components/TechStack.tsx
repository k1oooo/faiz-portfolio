"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { stackIcons } from "@/data/stack-icons";

// The first tiles are large (one row of three), the rest are small (one row of seven).
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  return (
    <ul
      ref={gridRef}
      className="relative grid grid-cols-12 md:grid-cols-21"
      onPointerLeave={() => {
        setHovered(null);
        moveTo(0);
      }}
    >
      {/* Black block: starts on the first (large) tile, which is a third of the width at 3:2 */}
      <div
        ref={blockRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bg-ink"
        style={{ width: "calc(100% / 3)", aspectRatio: "3 / 2" }}
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
              setHovered(i);
              moveTo(i);
            }}
            data-cursor
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className={`relative flex items-center justify-center transition-colors duration-300 ${
              active === i ? "text-paper" : "text-ink"
            } ${
              large ? "col-span-4 aspect-[3/2] md:col-span-7" : "col-span-3 aspect-square"
            }`}
          >
            <svg
              role="img"
              aria-label={name}
              viewBox="0 0 24 24"
              fill="currentColor"
              style={SCALE[name] ? { transform: `scale(${SCALE[name]})` } : undefined}
              className={
                large
                  ? "h-[clamp(3rem,6vw,7rem)] w-[clamp(3rem,6vw,7rem)]"
                  : "h-[clamp(2rem,4.2vw,5rem)] w-[clamp(2rem,4.2vw,5rem)]"
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
