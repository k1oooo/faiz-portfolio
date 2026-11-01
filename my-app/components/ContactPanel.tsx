import { site } from "@/data/site";

const row =
  "group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:text-accent";
const arrow =
  "text-[0.7em] opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100";

// Shared contact content, used by the /contacts page and the slide-up panel.
// Layout: small "Say Hello" label and a giant one-line "Let's talk" headline on the left with
// the intro at the bottom, and a contact card (email, phone, links) on the right.
// The parent decides the height and padding.
export default function ContactPanel({
  heading: Heading = "h1",
}: {
  heading?: "h1" | "p";
}) {
  return (
    <div className="grid flex-1 gap-10 md:grid-cols-12 md:gap-x-5">
      <div className="flex flex-col justify-between gap-10 md:col-span-7">
        <div>
          <p className="flex items-center gap-2 text-[15px] uppercase tracking-normal">
            <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
            Say Hello
          </p>
          <Heading className="mt-6 whitespace-nowrap text-[clamp(3rem,min(19vw,26svh),15rem)] font-medium leading-[0.85] tracking-[-0.065em] md:text-[clamp(4rem,min(11vw,26svh),15rem)] lg:text-[clamp(4rem,min(12vw,26svh),15rem)]">
            Let&apos;s talk
            <span
              aria-hidden
              className="ml-[0.03em] inline-block h-[0.1em] w-[0.1em] bg-accent"
            />
          </Heading>
        </div>
        <p className="lead max-w-xl">{site.contactLine}</p>
      </div>

      <ul className="divide-y divide-current/20 self-end border border-current/20 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
        <li>
          <a
            href={`mailto:${site.email}`}
            className={`${row} flex-col !items-start !gap-1`}
          >
            <span className="label">Email</span>
            <span className="flex w-full items-center justify-between gap-4 break-all text-[clamp(1.1rem,1.6vw,2rem)] leading-[1.15] tracking-[-0.04em]">
              {site.email}
              <span aria-hidden className={arrow}>
                ↗
              </span>
            </span>
          </a>
        </li>
        {site.phone && (
          <li>
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className={`${row} flex-col !items-start !gap-1`}
            >
              <span className="label">Phone</span>
              <span className="flex w-full items-center justify-between gap-4 text-[clamp(1.1rem,1.6vw,2rem)] leading-[1.15] tracking-[-0.04em]">
                {site.phone}
                <span aria-hidden className={arrow}>
                  ↗
                </span>
              </span>
            </a>
          </li>
        )}
        {site.links.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <li key={l.label}>
              <a
                href={l.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`${row} text-[clamp(1.1rem,1.6vw,2rem)] leading-[1.15] tracking-[-0.04em]`}
              >
                {l.label}
                <span aria-hidden className={arrow}>
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
