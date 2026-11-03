import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { docvyOpenGraphImage } from "@/lib/metadata";

const docvyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.docvy.in"),
  title: {
    default: "DOCVY — Healthcare discovery across India",
    template: "%s | DOCVY",
  },
  description:
    "Use DOCVY's plain-language specialty guide across India and browse source-linked hospital doctor profiles currently listed in Delhi, Gurugram and Noida.",
  applicationName: "DOCVY",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "DOCVY — Healthcare discovery across India",
    description: "A plain-language specialty guide for India, with a limited set of hospital-source doctor profiles in Delhi, Gurugram and Noida.",
    url: "/",
    images: [docvyOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCVY — Healthcare discovery across India",
    description: "Explore medical specialties across India and browse a limited set of hospital-source doctor profiles in Delhi, Gurugram and Noida. Contact providers directly to confirm availability.",
    images: ["/opengraph-image"],
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
              "@id": "https://www.docvy.in/#organization",
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
