import { site } from "@/data/site";

// Shared contact content, used by the /contacts page and the slide-up panel.
export default function ContactPanel({ heading: Heading = "h1" }: { heading?: "h1" | "p" }) {
  const [local, domain] = site.email.split("@");
  return (
    <>
      <Heading className="mega">
        Say Hello
        <span aria-hidden className="ml-[0.03em] inline-block h-[0.1em] w-[0.1em] bg-accent" />
        <span className="sr-only">.</span>
      </Heading>
      <div className="grid items-end gap-10 md:grid-cols-2">
        <p className="lead max-w-xl">{site.contactLine}</p>
        <div>
          <a
            href={`mailto:${site.email}`}
            className="block text-[clamp(1.8rem,4.6vw,4.6rem)] leading-[0.95] tracking-tight [overflow-wrap:anywhere] transition-colors hover:text-accent"
          >
            {/* Only allow a line break before the @, never in the middle of a word */}
            {local}
            <wbr />@{domain}
          </a>
          <div className="mt-4 flex gap-4 text-[18px] text-mid">
            {site.links.map((l, i) => (
              <span key={l.label} className="flex gap-4">
                {i > 0 && <span aria-hidden>|</span>}
                <a href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
