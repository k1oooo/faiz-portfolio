import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import NavPill from "@/components/NavPill";
import Animations from "@/components/Animations";

const general = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Regular.otf", weight: "400" },
    { path: "../public/fonts/GeneralSans-Semibold.otf", weight: "600" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Faiz Fahmi, Full Stack Web Developer",
    template: "%s | Faiz Fahmi",
  },
  description:
    "Faiz Fahmi is a full stack web developer who builds good looking, user centered websites that convert.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${general.variable} antialiased`}>
      <body className="min-h-svh">
        <Header />
        <NavPill />
        <main>{children}</main>
        <Animations />
      </body>
    </html>
  );
}
