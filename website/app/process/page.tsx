import type { Metadata } from "next";

export const metadata: Metadata = { title: "Process" };

// Edit the wording for each step here.
const steps = [
  {
    title: "Discovery",
    body: "We start with a call and a few questions about your business, your customers and what you want the site to achieve.",
  },
  {
    title: "Content Strategy",
    body: "I suggest what the site should say and how the pages fit together, then we refine it as a team.",
  },
  {
    title: "Visual Direction",
    body: "I share references and a look and feel for your brand, and we settle on a direction before any design starts.",
  },
  {
    title: "Design",
    body: "I design the pages in Figma and share them early, so you can give feedback before anything is built.",
  },
  {
    title: "Development",
    body: "I build the approved design in Next.js, fast and responsive on every screen, with motion that adds to the experience.",
  },
  {
    title: "Launch & Handover",
    body: "We test and go live on Vercel. I hand the site over and stay around to fix things and make improvements.",
  },
];

/**
 * Each step is one row: number on the left, title in the middle, description
 * on the right. The column positions are fixed fractions of the screen width
 * so every row lines up.
 */
export default function Process() {
  return (
    <section className="px-4 pb-10 pt-28 md:px-5 md:pb-12 md:pt-32">
      <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="block">Process</span>
        </span>
      </h1>

      <ol className="mt-10 flex flex-col gap-9 md:mt-[6svh] md:gap-[min(5.5svh,4.5rem)]">
        {steps.map((step, i) => (
          <li
            key={step.title}
           
            className="grid items-start gap-x-4 gap-y-2 grid-cols-[auto_1fr] md:grid-cols-[17.4fr_42.6fr_40fr] md:gap-x-0"
          >
            <span className="text-[clamp(1.5rem,2.6vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-[clamp(1.5rem,2.6vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-fg">
              {step.title}
            </h2>
            <p className="col-span-2 text-base leading-snug md:col-span-1 md:pr-2 md:text-[clamp(1rem,1.2vw,1.375rem)]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
