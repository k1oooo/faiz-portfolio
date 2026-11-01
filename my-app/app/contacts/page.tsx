import { pageMetadata } from "@/lib/seo";
import ContactPanel from "@/components/ContactPanel";
import Reveal from "@/components/Reveal";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Faiz Fahmi, a full stack web developer in Kuala Lumpur. Tell me about your project and I will design and code it.",
  path: "/contacts",
});

export default function Contacts() {
  return (
    <main className="flex min-h-svh flex-col px-5 pb-16 pt-24 md:pb-24 md:pt-32">
      <Reveal className="flex flex-1 flex-col">
        <ContactPanel />
      </Reveal>
    </main>
  );
}
