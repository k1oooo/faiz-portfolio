"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

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
      <Link href="/" className="leading-none">
        <div className="text-[22px] font-bold tracking-tight">{site.name}</div>
        <div className="mt-1 text-[15px] opacity-70">{site.tagline}</div>
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
