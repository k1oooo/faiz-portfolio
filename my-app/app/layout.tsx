import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Clock from "@/components/Clock";
import ContactReveal from "@/components/ContactReveal";

const sans = Inter_Tight({ variable: "--font-sans-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faiz | AI Student & Web Designer",
  description: "Portfolio of Faiz — AI student and freelance web designer based in Kuala Lumpur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="relative min-h-full">
        <div className="grid-lines" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <Header />
        <div data-page className="relative z-10">
          {children}
        </div>
        <ContactReveal />
        <Clock />
      </body>
    </html>
  );
}
