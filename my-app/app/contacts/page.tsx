import ContactPanel from "@/components/ContactPanel";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Contacts | Faiz" };

export default function Contacts() {
  return (
    <main className="flex min-h-screen flex-col px-5 pb-24 pt-32">
      <Reveal className="flex flex-1 flex-col">
        <ContactPanel />
      </Reveal>
    </main>
  );
}
