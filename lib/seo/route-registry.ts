import type { ProviderCity } from "@/lib/provider-candidates";

// Shared by the page's static params, metadata and sitemap. Other cities have no route.
export const doctorCitySlugs: Record<string, ProviderCity> = {
  delhi: "Delhi",
  gurugram: "Gurugram",
  noida: "Noida",
};
