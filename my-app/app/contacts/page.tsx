import { site } from "@/data/site";

export const metadata = { title: "Contacts | Faiz" };

export default function Contacts() {
  return (
    <main className="theme-dark flex min-h-screen flex-col justify-between px-5 pb-24 pt-32">
      <h1 className="mega">Say Hello.</h1>
      <div className="grid items-end gap-10 md:grid-cols-2">
        <p className="lead max-w-xl">{site.contactLine}</p>
        <div>
          <a
            href={`mailto:${site.email}`}
            className="block break-all text-[clamp(1.8rem,4.6vw,4.6rem)] leading-[0.95] tracking-tight"
          >
            {site.email}
          </a>
          <div className="mt-4 flex gap-4 text-[18px] text-mid">
            {site.links.map((l, i) => (
              <span key={l.label} className="flex gap-4">
                {i > 0 && <span aria-hidden>|</span>}
                <a href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
