import Link from "next/link";
import type { Project } from "@/data/projects";
import VideoFrame from "@/components/VideoFrame";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block bg-charcoal p-5 text-paper"
    >
      {p.logo ? (
        // The client's logo, centred on a light tile (set `logo` in data/projects.ts).
        <div className="relative aspect-[4/3] w-full bg-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.logo}
            alt={`${p.name} logo`}
            className="absolute inset-[14%] h-[72%] w-[72%] object-contain"
          />
        </div>
      ) : p.video ? (
        <VideoFrame
          src={p.video}
          poster={p.poster}
          label={`${p.name} website preview`}
          className="aspect-[4/3] w-full"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-mist/10 text-[13px] tracking-widest text-mid transition-colors group-hover:bg-mist/20">
          IMAGE PLACEHOLDER
        </div>
      )}
      <div className="mt-8 flex items-end justify-between gap-6 pb-4">
        <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-none tracking-tight">
          {p.name}
        </h3>
        <p className="text-right text-[14px] uppercase leading-none text-mist/70">
          {p.type}
        </p>
      </div>
    </Link>
  );
}
