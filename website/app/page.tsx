import WorkShowcase from "@/components/WorkShowcase";

const lines = [
  "I craft engaging,",
  "digital experiences",
  "that drive growth.",
];

export default function Home() {
  return (
    <>
      {/* Hero: just a headline, fills exactly one screen */}
      <section className="relative flex h-svh min-h-[520px] items-end px-4 pb-36 md:px-5 md:pb-44">
        <h1
          data-parallax
          className="text-[clamp(1.75rem,8vw,7rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-fg"
        >
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
      </section>

      {/* Work: the white rises up over the empty space under the headline, but
          the top padding keeps all project text below the fold until you
          scroll. It then pins and slides left. */}
      <section
        id="work"
        className="relative z-10 -mt-24 overflow-hidden rounded-t-[2rem] bg-[#fcfcfc] pt-12 md:-mt-32 md:rounded-t-[3rem] md:pt-24"
      >
        <WorkShowcase />
      </section>
    </>
  );
}
