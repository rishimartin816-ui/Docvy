import Link from "next/link";
import IllustrationBackground from "@/components/IllustrationBackground";

export default function NotFound() {
  return <section className="relative isolate mx-auto max-w-site overflow-hidden px-5 py-20 sm:px-8">
    <IllustrationBackground slug="404-find-your-way" alt="Meera and Aarav look at a map together." />
    <h1 className="text-4xl font-medium">We couldn’t find that page.</h1>
    <p className="mt-3 max-w-xl text-grey">You can go back to the homepage or search for a doctor.</p>
    <div className="mt-6 flex flex-wrap gap-3"><Link href="/" className="docvy-pill">Go home</Link><Link href="/doctors" className="docvy-pill docvy-pill-primary">Find a doctor</Link></div>
  </section>;
}
