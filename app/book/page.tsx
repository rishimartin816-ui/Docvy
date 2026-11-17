import BookingForm from '@/components/BookingForm';
import {buildPageSocialMetadata} from '@/lib/metadata';
import s from '@/components/patient/experience.module.css';
const title='Book an appointment through DOCVY';
const description='Choose your doctor, practice and preferred appointment time. See consultation fees, save your private reference and follow your visit updates through DOCVY.';
export const metadata={title,description,robots:{index:false,follow:false},alternates:{canonical:'https://www.docvy.in/book'},...buildPageSocialMetadata(title,description,'/book')};
export default function Page(){return <div className={`${s.root} ${s.bookingPage}`}><div className={s.wrap}><header className={s.bookingHeading}><span className={s.eyebrow}><span className={s.dot}/>Bookings are live</span><h1>Your next visit starts here.</h1><p>Choose your doctor, tell us what works for you, and keep your appointment updates together. DOCVY checks with the doctor before confirming your time.</p></header><BookingForm/></div></div>;}
