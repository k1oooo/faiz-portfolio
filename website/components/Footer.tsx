import { ArrowUpRight, Download, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  const contact = site.email
    ? { label: "Say hello", href: `mailto:${site.email}`, Icon: Mail }
    : { label: "Visit Vici", href: site.vici.href, Icon: ArrowUpRight };
  return (
    <footer className="mt-32 bg-black text-white">
      <div className="wrap py-16 sm:py-24">
        <p className="meta text-white/60">Available for projects</p>
        <a
          href={contact.href}
          className="link headline mt-6 inline-flex items-center gap-3"
        >
          {contact.label}
          <contact.Icon className="h-[0.8em] w-[0.8em]" strokeWidth={1.5} />
        </a>
        <div className="mt-20 flex flex-wrap items-end justify-between gap-6 text-sm text-white/60">
          <span>
            {site.name}, {site.location}
          </span>
          <ul className="flex gap-6">
            <li>
              <a
                href={site.resume}
                download
                className="link inline-flex items-center gap-1 text-white"
              >
                Resume <Download className="h-3.5 w-3.5" />
              </a>
            </li>
            {site.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link inline-flex items-center gap-1 text-white"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
