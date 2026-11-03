import type { Metadata } from "next";

export const docvyOpenGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DOCVY's healthcare discovery guide across India, with current doctor listings in Delhi NCR.",
};

export function buildPageSocialMetadata(
  title: string,
  description: string,
  url: string,
  openGraphType: "website" | "article" = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: openGraphType,
      locale: "en_IN",
      siteName: "DOCVY",
      title,
      description,
      url,
      images: [docvyOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
