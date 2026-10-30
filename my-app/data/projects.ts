export type Project = {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  summary: string;
  details: string;
  url?: string;
};

// Placeholder image blocks on the project pages are still empty; add screenshots when ready.
export const projects: Project[] = [
  {
    slug: "vici-corporate-website",
    title: "Vici Corporate Website",
    year: "2026",
    tags: ["CORPORATE WEBSITE", "NEXT.JS", "TAILWIND"],
    summary:
      "The corporate website for Vici Software Development, the software startup I co-founded in Kuala Lumpur.",
    details:
      "The site introduces who Vici is, what we build and how to work with us, so prospects can understand the company and get in touch quickly. I designed and built it end to end, keeping the layout clean and fast so the company comes across as credible from the first visit.",
    url: "https://vici-co.tech",
  },
  {
    slug: "xesp-consulting-corporate-website",
    title: "XESP Consulting Corporate Website",
    year: "2026",
    tags: ["CORPORATE WEBSITE", "NEXT.JS", "GSAP"],
    summary:
      "A full redesign of the corporate website for XESP Consulting, an oil and gas consultancy in Malaysia.",
    details:
      "I first built the original site as an intern at XESP, then rebuilt every page on Next.js with a refreshed navbar, footer and homepage. Page copy and configuration now live in dedicated data files so content updates stay simple, framer-motion was replaced with GSAP animations, and the palette follows a 60/30/10 colour rule with a single accent.",
    url: "https://www.xespconsulting.com",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
