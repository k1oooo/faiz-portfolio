import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/lib/work";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/${work.slug}`} data-reveal className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg">
        <Image
          src={work.image}
          alt={`${work.title} website`}
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
            {work.title}
          </h3>
          <p className="mt-1 text-sm">{work.kind}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-white/5 text-fg transition duration-300 group-hover:bg-fg group-hover:text-bg">
          <ArrowUpRight
            className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Link>
  );
}
