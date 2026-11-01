import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/about`, priority: 0.8 },
    { url: `${siteUrl}/contacts`, priority: 0.7 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      priority: 0.9,
    })),
  ];
}
