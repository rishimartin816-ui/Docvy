import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata:Metadata={
  title:"Request or book an appointment | DOCVY",
  description:"Request an appointment with a verified participating DOCVY provider. Confirmation status is shown clearly.",
  robots:{index:false,follow:false},
};
export default function BookPage(){
  return <main className="min-h-[80vh] bg-[#F6FAF8] px-5 py-12 text-[#173A37]">
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#087F83]">DOCVY · APPOINTMENTS</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Book your next appointment with DOCVY</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#526D66]">Choose a participating verified healthcare provider. Your appointment will either be confirmed immediately for an available slot or remain pending until the clinic confirms it. DOCVY does not collect consultation fees.</p>
      <BookingForm/>
      <p className="mt-6 text-sm text-[#526D66]">Please do not include symptoms, diagnoses or other medical information. For emergencies in India, contact 112 or your nearest emergency department.</p>
    </div>
  </main>;
}
