import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import { defaultDescription, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: { absolute: "Faiz Fahmi | Full Stack Web Developer in Kuala Lumpur" },
  description: defaultDescription,
  path: "/",
});

export default function Home() {
  return (
    <main className="px-5">
      {/* Hero is ~2/3 of the viewport so Selected Works peeks in on first load */}
      <h1 className="sr-only">
        Faiz Fahmi, Full Stack Web Developer in Kuala Lumpur. I design and code it.
      </h1>
      <section className="flex h-[66svh] min-h-[420px] items-center justify-between pt-10">
        <Reveal as="h2" className="mega">
          Projects
        </Reveal>
        <Reveal as="span" delay={0.15} className="mega flex items-start">
          <span
            aria-hidden
            className="mr-[0.06em] mt-[0.1em] inline-block h-[0.215em] w-[0.08em] bg-accent"
          />
          26
          <span className="sr-only">&apos;26</span>
        </Reveal>
      </section>
      <section className="pb-32">
        <Reveal as="p" className="label mb-3">
          SELECTED WORKS
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
