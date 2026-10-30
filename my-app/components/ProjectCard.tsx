import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group block bg-charcoal p-5 text-paper">
      <div className="flex aspect-[4/3] items-center justify-center bg-mist/10 text-[13px] tracking-widest text-mid transition-colors group-hover:bg-mist/20">
        IMAGE PLACEHOLDER
      </div>
      <div className="mt-8 flex items-end justify-between gap-6 pb-4">
        <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-tight">{p.title}</h3>
        <ul className="text-right text-[14px] leading-snug text-mist/70">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
