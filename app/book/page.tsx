import BookingForm from "@/components/BookingForm";
export const metadata={title:"Book through DOCVY",robots:{index:false,follow:false},alternates:{canonical:"https://www.docvy.in/book"}};
export default function Page(){return <section className="mx-auto max-w-3xl px-6 py-12"><h1 className="text-4xl font-bold">Book your appointment through DOCVY</h1><p className="mt-4">Choose a doctor and request your preferred time. DOCVY checks availability with the doctor before confirming. DOCVY keeps your booking, confirmation and visit updates together.</p><BookingForm/></section>;}
