import WorkShowcase from "@/components/WorkShowcase";

const lines = ["I build good looking,", "user centered websites", "that convert."];

export default function Home() {
  return (
    <>
      {/* Hero: just a headline, fills exactly one screen */}
      <section className="relative flex h-svh min-h-[520px] items-end px-5 pb-36 md:px-10 md:pb-44">
        <h1
          data-parallax
          className="max-w-[1600px] text-[clamp(1.75rem,8vw,7rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-fg"
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

      {/* Work: slides up over the hero, then pins and slides left */}
      <section
        id="work"
        className="relative z-10 -mt-24 overflow-hidden rounded-t-[2rem] bg-[#fcfcfc] md:-mt-32 md:rounded-t-[3rem]"
      >
        <WorkShowcase />
      </section>
    </>
  );
}
