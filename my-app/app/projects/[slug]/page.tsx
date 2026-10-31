import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import VideoFrame from "@/components/VideoFrame";

// All project pages are prerendered from generateStaticParams, so the page is allowed to
// read params directly instead of streaming it behind a Suspense fallback.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();
  // The next project in the list; the last project loops back to the first.
  const next =
    projects[
      (projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length
    ];

  return (
    <main className="px-5 pb-32 pt-48">
      <Reveal
        as="h1"
        className="text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[-0.06em]"
      >
        {p.title}
      </Reveal>
      <Reveal
        as="p"
        delay={0.1}
        className="mt-4 text-[clamp(1.6rem,3vw,2.6rem)] text-mid"
      >
        {p.year}
      </Reveal>

      {p.video ? (
        <Reveal delay={0.2} className="mt-24">
          <VideoFrame
            src={p.video}
            poster={p.poster}
            label={`${p.title} website preview`}
            className="aspect-[16/9] w-full"
            autoPlay
          />
        </Reveal>
      ) : (
        <Reveal
          delay={0.2}
          className="mt-24 flex aspect-[16/9] items-center justify-center bg-charcoal text-[13px] tracking-widest text-mid"
        >
          HERO IMAGE
        </Reveal>
      )}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Reveal
            key={n}
            delay={(n - 1) * 0.12}
            className="flex aspect-[3/4] items-center justify-center bg-charcoal text-[13px] tracking-widest text-mid"
          >
            IMAGE {n}
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_2fr_2fr]">
        <Reveal as="h2" className="label">
          ABOUT PROJECT
        </Reveal>
        <Reveal as="p" delay={0.1} className="lead">
          {p.summary}
        </Reveal>
        <Reveal as="p" delay={0.2} className="lead">
          {p.details}
        </Reveal>
      </div>

      {p.url && (
        <Reveal className="mt-12">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[15px] text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            VISIT WEBSITE ↗
          </a>
        </Reveal>
      )}

      {/* Next project: its own full screen, centered in the middle 4 of 12 columns, so nothing from the page above shows next to it */}
      {next.slug !== p.slug && (
        <section
          aria-label="Next project"
          className="mt-32 grid min-h-svh content-center gap-5 md:grid-cols-12"
        >
          <Reveal className="md:col-span-4 md:col-start-5">
            <p className="label mb-3 text-center">NEXT PROJECT</p>
            <ProjectCard p={next} />
          </Reveal>
        </section>
      )}
    </main>
  );
}
