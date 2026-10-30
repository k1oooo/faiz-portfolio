import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="px-5">
      {/* Hero is ~2/3 of the viewport so Selected Works peeks in on first load */}
      <section className="flex h-[66svh] min-h-[420px] items-center justify-between pt-10">
        <h1 className="mega">Projects</h1>
        <span className="mega flex items-start">
          <span
            aria-hidden
            className="mr-[0.06em] mt-[0.1em] inline-block h-[0.215em] w-[0.08em] bg-accent"
          />
          26
          <span className="sr-only">&apos;26</span>
        </span>
      </section>
      <section className="pb-32">
        <p className="label mb-3">SELECTED WORKS</p>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
