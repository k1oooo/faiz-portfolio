"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { stackIcons } from "@/data/stack-icons";

/**
 * Icon-only tech stack. A single accent block sits behind the icons and glides to
 * whichever tile is hovered, then returns to the first tile when the pointer leaves.
 */
export default function TechStack({ items }: { items: string[] }) {
  const gridRef = useRef<HTMLUListElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLLIElement | null)[]>([]);
  const current = useRef(0);

  const moveTo = (index: number, animate = true) => {
    const tile = tiles.current[index];
    const block = blockRef.current;
    if (!tile || !block) return;
    current.current = index;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(block, {
      x: tile.offsetLeft,
      y: tile.offsetTop,
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
      className="relative grid grid-cols-3"
      onPointerLeave={() => moveTo(0)}
    >
      {/* Accent block: same size as one tile (a third of the width, 4:3), starts on tile 0 */}
      <div
        ref={blockRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bg-accent"
        style={{ width: "calc(100% / 3)", aspectRatio: "4 / 3" }}
      />
      {items.map((name, i) => (
        <li
          key={name}
          ref={(el) => {
            tiles.current[i] = el;
          }}
          onPointerEnter={() => moveTo(i)}
          className="relative flex aspect-[4/3] items-center justify-center text-ink"
        >
          <svg
            role="img"
            aria-label={name}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[clamp(2.5rem,5.5vw,5.5rem)] w-[clamp(2.5rem,5.5vw,5.5rem)]"
          >
            <title>{name}</title>
            <path d={stackIcons[name]} />
          </svg>
        </li>
      ))}
    </ul>
  );
}
