import { site } from "@/data/site";

// Shared contact content, used by the /contacts page and the slide-up panel.
// Layout: small "Say Hello" label, the email as a giant headline, then the intro
// on the left and the links on the right. The parent decides the height and padding.
export default function ContactPanel({ heading: Heading = "h1" }: { heading?: "h1" | "p" }) {
  const [local, domain] = site.email.split("@");
  return (
    <>
      <div>
        <Heading className="flex items-center gap-2 text-[15px] uppercase tracking-normal">
          <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
          Say Hello
        </Heading>
        <a
          href={`mailto:${site.email}`}
          aria-label={site.email}
          className="mt-6 block text-[clamp(2.6rem,min(11vw,22svh),14rem)] font-medium leading-[0.85] tracking-[-0.065em] [overflow-wrap:anywhere] transition-colors hover:text-accent"
        >
          {/* Two fixed lines: name, then @domain */}
          <span className="block">{local}</span>
          <span className="block">@{domain}</span>
        </a>
      </div>

      <div className="grid items-end gap-10 md:grid-cols-12">
        <p className="lead max-w-xl md:col-span-6">{site.contactLine}</p>
        <ul className="text-[clamp(1.5rem,2.1vw,2.6rem)] leading-[1.15] tracking-[-0.04em] md:col-span-3 md:col-start-10">
          {site.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 transition-colors hover:text-accent"
                >
                  {l.label}
                  <span
                    aria-hidden
                    className="text-[0.7em] opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
