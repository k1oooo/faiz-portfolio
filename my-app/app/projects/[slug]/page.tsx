import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="px-5 pb-32 pt-48">
      <h1 className="text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[-0.06em]">{p.title}</h1>
      <p className="mt-4 text-[clamp(1.6rem,3vw,2.6rem)] text-mid">{p.year}</p>

      <div className="mt-24 flex aspect-[16/9] items-center justify-center bg-charcoal text-[13px] tracking-widest text-mid">
        HERO IMAGE
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex aspect-[3/4] items-center justify-center bg-charcoal text-[13px] tracking-widest text-mid">
            IMAGE {n}
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_2fr_2fr]">
        <ul className="label leading-snug">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="lead">{p.summary}</p>
        <p className="lead">{p.details}</p>
      </div>

      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block text-[15px] text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          VISIT WEBSITE ↗
        </a>
      )}
    </main>
  );
}
