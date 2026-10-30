export type Project = {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  summary: string;
  details: string;
};

// TODO: replace placeholder copy with the real project details and images.
export const projects: Project[] = [
  {
    slug: "kio-web",
    title: "Kio Web",
    year: "2026",
    tags: ["WEB DESIGN", "NEXT.JS", "TAILWIND"],
    summary:
      "A freelance web design studio building fast, clean websites for cafes and small businesses in Kuala Lumpur.",
    details:
      "Placeholder: describe the services, the sites you've shipped, and the results for your clients.",
  },
  {
    slug: "whatsapp-crm",
    title: "WhatsApp CRM Prototype",
    year: "2026",
    tags: ["PROTOTYPE", "CRM", "AUTOMATION"],
    summary:
      "A prototype CRM that brings customer conversations from WhatsApp into one place for small businesses.",
    details:
      "Placeholder: describe the problem, the architecture, and what you learned while hardening it.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
