import type { Metadata } from "next";
import { site } from "@/data/site";

// The production address. Set NEXT_PUBLIC_SITE_URL (for example when you add a custom
// domain) and everything below follows: canonical links, sitemap, share previews.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://faizfami-portfolio.vercel.app"
).replace(/\/$/, "");

export const personName = "Faiz Fahmi";
export const jobTitle = "Full Stack Web Developer";
export const siteName = "Faiz Fahmi | Full Stack Web Developer";

export const defaultDescription =
  "Full stack web developer in Kuala Lumpur. I design and code it: fast, modern websites and web apps built with Next.js, TypeScript and Tailwind.";

// Pages that set their own openGraph/twitter replace the root ones, so the share image is repeated.
const defaultImage = "/opengraph-image.png";

type PageMeta = {
  title: Metadata["title"];
  description: string;
  path: string; // "/about"
  image?: string; // overrides the default share image
};

/** Title, description, canonical link and share previews for one page. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: typeof title === "string" ? title : undefined,
      description,
      url: path,
      siteName,
      locale: "en_MY",
      type: "website",
      images: [{ url: image ?? defaultImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description,
      images: [image ?? defaultImage],
    },
  };
}

export const sameAs = site.links
  .map((l) => l.href)
  .filter((h) => h.startsWith("http"));
