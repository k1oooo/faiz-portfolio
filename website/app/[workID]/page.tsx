import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { works } from "@/lib/work";

export function generateStaticParams() {
  return works.map((w) => ({ workID: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[workID]">): Promise<Metadata> {
  const { workID } = await params;
  const work = works.find((w) => w.slug === workID);
  return { title: work?.title ?? "Work" };
}

export default async function WorkPage({ params }: PageProps<"/[workID]">) {
  const { workID } = await params;
  const index = works.findIndex((w) => w.slug === workID);
  if (index === -1) notFound();

  const work = works[index];
  const next = works[(index + 1) % works.length];

  return (
    <article className="px-4 pb-24 pt-28 md:px-5 md:pt-36">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-fg"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} />
        All work
      </Link>

      <header className="mt-10 grid gap-8 md:mt-16 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <h1
          className="text-[clamp(2.5rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.04em] text-fg"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-hero-line className="block">{work.title}</span>
          </span>
        </h1>
        <div data-reveal className="md:pt-3">
          <p className="text-lg leading-relaxed md:text-xl">{work.summary}</p>
          <p className="mt-6 text-sm">{work.kind}</p>
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition duration-300 hover:bg-white"
            >
              Visit site
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          )}
        </div>
      </header>

      <div data-reveal data-header="light" className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl bg-surface md:mt-20">
        <Image
          src={work.image}
          alt={`${work.title} website`}
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Link
        href={`/${next.slug}`}
        data-reveal
        data-header="light"
        className="group relative mt-20 block aspect-[16/10] overflow-hidden rounded-2xl bg-surface md:mt-32"
      >
        <Image
          src={next.image}
          alt={`Next project: ${next.title}`}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>
    </article>
  );
}
