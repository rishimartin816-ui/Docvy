import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import RouteBreadcrumbs from "@/components/RouteBreadcrumbs";
import Footer from "@/components/Footer";
import { docvyOpenGraphImage } from "@/lib/metadata";

const docvyFont = localFont({
  src: "./fonts/google-sans-flex-latin-wght-normal.woff2",
  variable: "--font-head",
  weight: "100 1000",
  display: "swap",
  fallback: ["Google Sans", "system-ui"],
  adjustFontFallback: false,
});
const docvyBodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docvy.in"),
  title: {
    default: "DOCVY — Healthcare discovery across India",
    template: "%s | DOCVY",
  },
  description: "DOCVY helps people in India understand medical specialties and prepare for a visit with plain-language patient guides.",
  applicationName: "DOCVY",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "DOCVY — Healthcare discovery across India",
    description: "DOCVY helps people in India understand medical specialties and prepare for a visit with plain-language patient guides.",
    url: "/",
    images: [docvyOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCVY — Healthcare discovery across India",
    description: "DOCVY helps people in India understand medical specialties and prepare for a visit with plain-language patient guides.",
    images: [docvyOpenGraphImage.url],
  },
  robots: process.env.VERCEL_ENV !== "production" || process.env.DOCVY_INDEXING_ENABLED !== "true" ? { index: false, follow: false } : {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${docvyFont.variable} ${docvyBodyFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.docvy.in/#organization",
              name: "DOCVY",
              url: "https://www.docvy.in",
              email: "contact@docvy.in",
              logo: "https://www.docvy.in/icon.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2nd Floor, Capital Cityscape, Sector 66",
                addressLocality: "Gurugram",
                addressRegion: "Haryana",
                postalCode: "122101",
                addressCountry: "IN",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:bg-white focus:p-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main"><RouteBreadcrumbs />{children}</main>
        <Footer />
      </body>
    </html>
  );
}
