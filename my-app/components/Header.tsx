"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { signature } from "@/data/signature";

const nav = [
  { label: "PROJECTS", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACTS", href: "/contacts" },
];

export default function Header() {
  const pathname = usePathname();
  const active = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/projects") : pathname.startsWith(href);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-4 text-white mix-blend-difference">
      <Link href="/" aria-label={`${site.name}, home`} className="group block leading-none">
        {/* My real signature as a hollow outline. On hover a line draws itself around it. */}
        <svg
          viewBox={`0 0 ${signature.width} ${signature.height}`}
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          aria-hidden
          className="h-10 w-auto md:h-20"
        >
          {/* Resting outline, always visible but quiet */}
          {signature.paths.map((d, i) => (
            <path key={`base-${i}`} d={d} strokeWidth={1.2} opacity={0.4} vectorEffect="non-scaling-stroke" />
          ))}
          {/* Bright line that traces the same outline on hover */}
          {signature.paths.map((d, i) => (
            <path
              key={`draw-${i}`}
              d={d}
              pathLength={1}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              className="sig-trace"
            />
          ))}
        </svg>
      </Link>
      <nav className="flex gap-5 text-[15px]">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={active(n.href) ? "font-bold" : "opacity-60 transition-opacity hover:opacity-100"}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
