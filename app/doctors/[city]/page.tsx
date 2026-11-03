import { redirect } from "next/navigation";
import { discoveryCities } from "@/components/DiscoverySearch";

export default function CityDoctorsPage({ params }: { params: { city: string } }) {
  const city = discoveryCities.find((item) => item.toLowerCase() === params.city);
  redirect(city ? "/doctors?city=" + encodeURIComponent(city) : "/doctors");
}
