import { site } from "@/data/site";
import { defaultDescription, jobTitle, personName, sameAs, siteName, siteUrl } from "@/lib/seo";

/** Renders one JSON-LD block. "<" is escaped so the data can never close the script tag. */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Site-wide structured data: who Faiz is and what the website is. */
export default function JsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personName,
    url: siteUrl,
    image: `${siteUrl}/images/me-color.jpeg`,
    jobTitle,
    description: defaultDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "MY",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universiti Teknologi Malaysia" },
    worksFor: {
      "@type": "Organization",
      name: "Vici Software Development",
      url: "https://vici-co.tech",
    },
    knowsAbout: site.stack,
    sameAs,
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: defaultDescription,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };
  return <JsonLdScript data={{ "@context": "https://schema.org", "@graph": [person, website] }} />;
}
