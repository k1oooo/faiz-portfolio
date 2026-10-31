import { site } from "@/data/site";

// "How I work": the steps live in data/site.ts -> process.
// The section fills one full screen; each step stretches top to bottom with the
// number at the top and the title and text at the bottom.
export default function HowIWork() {
  return (
    <section className="flex min-h-svh flex-col pb-24 pt-28">
      <p className="label mb-3">HOW I WORK</p>
      <ol className="grid flex-1 gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {site.process.map((step, i) => (
          <li key={step.title} className="group flex flex-col justify-between gap-16 border-t border-ink pt-4">
            <span className="flex items-center gap-2 text-[15px] text-mid transition-colors group-hover:text-accent">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* On wide screens every column gets the same block height and a two-line title
                area, so titles and paragraphs line up across the four steps. */}
            <div className="lg:min-h-[clamp(15rem,15vw,22rem)]">
              <h3 className="text-[clamp(1.8rem,3.2vw,3.6rem)] leading-none tracking-[-0.05em] lg:min-h-[2em]">
                {step.title}
              </h3>
              <p className="mt-5 max-w-[34ch] text-[clamp(1rem,1.15vw,1.35rem)] leading-snug tracking-[-0.02em] text-mid">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
