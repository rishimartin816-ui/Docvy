import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const head = Manrope({ subsets: ["latin"], variable: "--font-head", weight: ["600", "700", "800"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = { title: "Docvy – Medical documentation, made simpler", description: "Request medical documentation online. A registered medical practitioner reviews your case where required. No guaranteed certificate." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en-IN" className={`${head.variable} ${body.variable}`}><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-porc">Skip to content</a>
    <Nav /><main id="main">{children}</main><Footer /></body></html>);
}
