import type { Metadata } from "next";

export const productionOrigin = "https://www.docvy.in";
export const homeLanguageLinks = { "en-IN": productionOrigin + "/", "hi-IN": productionOrigin + "/hi", "x-default": productionOrigin + "/" };
export const docvyOpenGraphImage = {
  url: productionOrigin + "/brand/14_DOCVY_OpenGraph_1200x630.png",
  width: 1200,
  height: 630,
  alt: "DOCVY — Find your way to care.",
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
      url: new URL(url, productionOrigin).href,
      images: [docvyOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [docvyOpenGraphImage.url],
    },
  };
}
