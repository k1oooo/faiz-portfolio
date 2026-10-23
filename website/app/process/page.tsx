import type { Metadata } from "next";

export const metadata: Metadata = { title: "Process" };

const steps = [
  {
    title: "Understand",
    body: "We start with your goals, your customers and what a good result looks like. I ask a lot of questions so the site is built around what actually matters.",
  },
  {
    title: "Design",
    body: "I shape the layout and look in Figma and share it early. You see where it's going and give feedback before anything is built.",
  },
  {
    title: "Build",
    body: "I build it in Next.js, fast and responsive on every screen, with motion that adds to the experience instead of getting in the way.",
  },
  {
    title: "Launch",
    body: "We test, polish and go live. After launch I stay around to fix things and make improvements.",
  },
];

export default function Process() {
  return (
    <section className="px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
        <span className="block overflow-hidden pb-[0.08em]">
          <span data-hero-line className="block">Process</span>
        </span>
      </h1>
      <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
        A simple way of working, from first call to launch.
      </p>

      <ol className="mt-16 space-y-14 md:mt-24 md:space-y-24">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            className="grid gap-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20"
          >
            <div className="flex items-baseline gap-5">
              <span className="text-sm tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-5xl">
                {step.title}
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-relaxed md:pt-2 md:text-xl">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
