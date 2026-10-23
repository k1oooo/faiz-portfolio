"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Mail, MessageCircle } from "lucide-react";
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
      className="relative ml-1 sm:ml-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full bg-(--hdr-fg,#fff) px-3.5 py-1.5 text-[13px] font-semibold text-(--hdr-inv,#0a0a0a) shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.3),0_6px_16px_-6px_rgba(0,0,0,0.5)] ring-1 ring-black/10 transition duration-200 ease-out hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.3),0_10px_20px_-6px_rgba(0,0,0,0.55)] active:translate-y-0 active:scale-[0.97] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--hdr-fg,#fff) sm:px-4 sm:py-2 sm:text-sm"
      >
        Contact
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2.25}
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
        <ul className="overflow-hidden rounded-2xl bg-(--hdr-fg,#fff) p-1.5 text-(--hdr-inv,#0a0a0a) shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
          {options.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                role="menuitem"
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--hdr-inv,#0a0a0a)_12%,transparent)]"
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
