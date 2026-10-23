export type Work = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  image: string; // tall portrait image, shown in the middle column
  role: string;
  timeline?: string; // e.g. "3 Months" (hidden if left out)
  tools: string[];
  url?: string;
};

// Edit the details for each project here.
export const works: Work[] = [
  {
    slug: "vici",
    title: "Vici",
    kind: "Website",
    summary:
      "The website for Vici, the startup I co-founded. A clear, fast site that explains what we do and gets people to take the next step.",
    image: "/work/vici.svg",
    role: "Full Stack Web Developer",
    tools: ["Figma", "Next.js", "Tailwind"],
    url: "https://vici-co.tech",
  },
  {
    slug: "xesp-consulting",
    title: "XESP Consulting",
    kind: "Website",
    summary:
      "A website for XESP Consulting, built to look professional, be easy to read on any screen and make getting in touch simple.",
    image: "/work/xesp-consulting.svg",
    role: "Full Stack Web Developer",
    tools: ["Figma", "Next.js", "Tailwind"],
  },
];
