import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const docvyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docvy.in"),
  title: {
    default: "DOCVY — Find your way to care in Delhi NCR",
    template: "%s | DOCVY",
  },
  description:
    "Use DOCVY's plain-language patient guide to understand medical specialties. Doctor listings and appointment requests for Delhi NCR are being prepared and are not open yet.",
  applicationName: "DOCVY",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "DOCVY — Find your way to care in Delhi NCR",
    description: "A plain-language guide to medical specialties and a clearer way to discover doctors, clinics and hospitals in Delhi NCR. Doctor listings and booking are not open yet.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "DOCVY — Healthcare discovery in Delhi NCR",
    description: "Understand medical specialties and how DOCVY is preparing doctor discovery for Delhi NCR. Patient search and appointment requests are not live yet.",
  },
  robots: {
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
    <html lang="en-IN" className={docvyFont.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DOCVY",
              url: "https://www.docvy.in",
              email: "contact@docvy.in",
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
