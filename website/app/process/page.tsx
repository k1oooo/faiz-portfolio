import type { Metadata } from "next";

export const metadata: Metadata = { title: "Process" };

// Edit the wording for each step here.
const steps = [
  {
    title: "Discovery",
    body: "A quick call to discuss your goals, target audience, and any domain or hosting preferences.",
  },
  {
    title: "Content",
    body: "We outline the site's structure and messaging to ensure it connects with your users.",
  },
  {
    title: "Direction",
    body: "I share moodboards and design references to lock in the perfect look for your brand.",
  },
  {
    title: "Design",
    body: "I create detailed layouts in Figma and gather your feedback before writing any code.",
  },
  {
    title: "Development",
    body: "I build a fast, responsive Next.js application tailored to your exact approved designs.",
  },
  {
    title: "Launch",
    body: "I recommend or configure your preferred domain and hosting, then launch the site flawlessly.",
  },
];

/**
 * Each step is one row: number on the left, title in the middle, description
 * on the right. The column positions are fixed fractions of the screen width
 * so every row lines up.
 */
export default function Process() {
  return (
    <section className="px-4 pb-10 pt-28 md:flex md:h-svh md:min-h-[34rem] md:flex-col md:px-5 md:pb-5 md:pt-24">
      <h1 className="text-[clamp(2rem,min(5vw,9svh),4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="block">Process</span>
        </span>
      </h1>

      <ol className="mt-10 flex flex-col gap-9 md:mt-[3svh] md:min-h-0 md:flex-1 md:justify-between md:gap-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid items-start gap-x-4 gap-y-2 grid-cols-[auto_1fr] md:grid-cols-[17.4fr_42.6fr_40fr] md:gap-x-0"
          >
            <span className="text-[clamp(1.5rem,min(2.6vw,4.4svh),2.75rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-[clamp(1.5rem,min(2.6vw,4.4svh),2.75rem)] font-semibold leading-none tracking-[-0.03em] text-fg">
              {step.title}
            </h2>
            <p className="col-span-2 text-base leading-snug md:col-span-1 md:pr-2 md:text-[clamp(1rem,min(1.2vw,2.3svh),1.375rem)]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
