import ContactPanel from "@/components/ContactPanel";

export const metadata = { title: "Contacts | Faiz" };

export default function Contacts() {
  return (
    <main className="theme-dark flex min-h-screen flex-col justify-between px-5 pb-24 pt-32">
      <ContactPanel />
    </main>
  );
}
