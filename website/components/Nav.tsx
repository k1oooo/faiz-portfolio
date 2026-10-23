"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
];

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="meta hidden tabular-nums sm:inline" aria-hidden>
      KL {time || "--:--"}
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="wrap flex items-center justify-between gap-6 py-5">
      <Link href="/" className="press font-semibold tracking-tight">
        {site.name}
      </Link>
      <nav className="flex items-center gap-6 sm:gap-8" aria-label="Primary">
        <Clock />
        {links.map((l) => {
          const active =
            l.href === "/"
              ? pathname === "/" || (!["/about", "/process"].includes(pathname))
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className="link text-sm"
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
