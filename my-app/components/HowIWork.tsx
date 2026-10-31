import { site } from "@/data/site";

// "How I work": the steps live in data/site.ts -> process.
export default function HowIWork() {
  return (
    <section>
      <p className="label mb-3">HOW I WORK</p>
      <ol className="grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {site.process.map((step, i) => (
          <li key={step.title} className="group border-t border-ink pt-4">
            <span className="flex items-center gap-2 text-[15px] text-mid transition-colors group-hover:text-accent">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="lead mt-16 md:mt-24">{step.title}</h3>
            <p className="mt-4 max-w-[34ch] text-[17px] leading-snug tracking-[-0.02em] text-mid">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
