import "./globals.css";
// Publication and removal changes must be reflected in every public view, including footer links.
export const dynamic = "force-dynamic";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import RouteBreadcrumbs from "@/components/RouteBreadcrumbs";
import Footer from "@/components/Footer";
import SiteFrame from "@/components/SiteFrame";
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

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#143C2B" };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docvy.in"),
  title: {
    default: "DOCVY — Healthcare discovery across India",
    template: "%s | DOCVY",
  },
  description: "DOCVY helps people in India understand medical specialties and prepare for a visit with plain-language patient guides.",
  applicationName: "DOCVY",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" }, { url: "/icons/favicon-96.png", sizes: "96x96", type: "image/png" }] },
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
              logo: "https://www.docvy.in/brand/01_DOCVY_Primary_Transparent.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sector 48",
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
        <SiteFrame navigation={<Nav />} footer={<Footer />} breadcrumbs={<RouteBreadcrumbs />}>{children}</SiteFrame>
      </body>
    </html>
  );
}
