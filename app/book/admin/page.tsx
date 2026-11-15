import type { Metadata } from "next";
import BookingAdmin from "@/components/BookingAdmin";
export const metadata:Metadata={title:"DOCVY Booking Operations",robots:{index:false,follow:false}};
export default function Page(){
  return <main className="min-h-[85vh] bg-[#F6FAF8] px-4 py-10 text-[#173A37]">
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#087F83]">DOCVY OPERATIONS · RESTRICTED</p>
      <h1 className="mt-3 text-3xl font-black">Appointment control centre</h1>
      <p className="mt-2 text-sm text-[#526D66]">Review incoming requests, confirm after clinic verification and track appointment status. Only authorized DOCVY and clinic operators can access patient details.</p>
      <BookingAdmin/>
    </div>
  </main>;
}
