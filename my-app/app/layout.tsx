import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Clock from "@/components/Clock";
import ContactReveal from "@/components/ContactReveal";
import ThemeSync from "@/components/ThemeSync";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";

const sans = Inter_Tight({ variable: "--font-sans-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://faizfami-portfolio.vercel.app"),
  title: "Faiz | AI Student & Web Designer",
  description: "Portfolio of Faiz, an AI student and freelance web designer based in Kuala Lumpur.",
  openGraph: {
    title: "Faiz | AI Student & Web Designer",
    description: "Portfolio of Faiz, an AI student and freelance web designer based in Kuala Lumpur.",
    url: "/",
    siteName: "Faiz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz | AI Student & Web Designer",
    description: "Portfolio of Faiz, an AI student and freelance web designer based in Kuala Lumpur.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} h-full antialiased`}>
      <body className="relative min-h-full">
        <div className="grid-lines" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <ThemeSync />
        <ScrollToTop />
        <CustomCursor />
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
