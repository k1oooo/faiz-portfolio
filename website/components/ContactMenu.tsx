"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

const options = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
];

/** Contact button. Hover (or tap) opens a small WhatsApp / Email dropdown. */
export default function ContactMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative ml-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
      >
        Contact
        <ArrowUpRight
          className={`size-4 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {/* pt-2 keeps the hover alive while the pointer crosses the gap */}
      <div
        role="menu"
        className={`absolute right-0 top-full w-48 origin-top-right pt-2 transition duration-300 ease-out ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <ul className="overflow-hidden rounded-2xl bg-white p-1.5 text-black">
          {options.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                role="menuitem"
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-black/10"
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
                {label}
                <ArrowUpRight
                  className="ml-auto size-4 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
