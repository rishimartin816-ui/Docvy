import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const head = DM_Sans({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["400", "500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: {
    default: "DOCVY — Connected healthcare discovery and operations",
    template: "%s | DOCVY",
  },
  description:
    "DOCVY is building a connected healthcare experience for patient discovery, doctors, clinics and hospitals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${head.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-white focus:p-3 focus:text-[#173A37]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
