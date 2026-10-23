import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/lib/work";

export function WorkGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid sm:grid-cols-2">
      {items.map((p, i) => (
        <Link
          key={p.slug}
          href={`/${p.slug}`}
          className={`work-card group block border-b border-black ${
            i % 2 === 0 ? "sm:border-r" : ""
          }`}
        >
          <Reveal className="wrap py-[var(--pad)]">
            <div className="relative aspect-[4/3] overflow-hidden border border-black">
              <Image
                src={p.cover}
                alt={`${p.title} cover`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="meta text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  {p.title}
                </h3>
              </div>
              <span className="meta flex items-center gap-2 text-black/60">
                {p.discipline}
                <ArrowUpRight className="h-4 w-4 text-black transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Reveal>
        </Link>
      ))}
    </div>
  );
}
