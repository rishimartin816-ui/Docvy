import { getDirectoryDoctors } from "@/lib/public-directory";
export const dynamic = "force-dynamic";
export async function GET() {
 const doctors = await getDirectoryDoctors();
 const cell = (v: string) => '"' + (/^[=+@-]/.test(v) ? "'" : "") + v.replaceAll('"', '""') + '"';
 const rows = [["Name","Specialty","Hospital","City","Profile status","Official source"], ...doctors.map(d => [d.name,d.specialties.join("; "),d.hospital,d.locations[0].city,d.profileStatus,d.sourceUrl])];
 return new Response(rows.map(row=>row.map(cell).join(",")).join("\r\n"), {headers:{"Content-Type":"text/csv; charset=utf-8","Cache-Control":"no-store","Content-Disposition":"attachment; filename=docvy-ncr-doctors.csv"}});
}
