import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Clock from "@/components/Clock";
import ContactReveal from "@/components/ContactReveal";
import ThemeSync from "@/components/ThemeSync";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/JsonLd";
import { defaultDescription, personName, siteName, siteUrl } from "@/lib/seo";

const sans = Inter_Tight({
  variable: "--font-sans-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Faiz Fahmi | Full Stack Web Developer in Kuala Lumpur",
    template: "%s | Faiz Fahmi",
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "full stack web developer",
    "web developer Kuala Lumpur",
    "freelance web developer Malaysia",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "web design and development",
    "Faiz Fahmi",
  ],
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Faiz Fahmi | Full Stack Web Developer in Kuala Lumpur",
    description: defaultDescription,
    url: "/",
    siteName,
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faiz Fahmi | Full Stack Web Developer in Kuala Lumpur",
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <div className="grid-lines" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <JsonLd />
        <ThemeSync />
        <ScrollToTop />
        <CustomCursor />
        <Header />
        <div data-page className="relative z-10">
          {children}
        </div>
        <ContactReveal />
        <Clock />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
