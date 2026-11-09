"use client";

import Image from "next/image";
import { useState } from "react";
import { UserRound } from "lucide-react";

type Props = { name: string; src?: string; large?: boolean };

export default function DoctorPortrait({ name, src, large = false }: Props) {
  const [failed, setFailed] = useState(false);
  return <div className={`relative shrink-0 overflow-hidden rounded-2xl border border-line bg-surface ${large ? "h-44 w-36 sm:h-52 sm:w-44" : "h-32 w-28"}`}>
    {src && !failed ? <Image src={src} alt={`Portrait of ${name}`} fill sizes={large ? "176px" : "112px"} className="object-cover object-top" onError={() => setFailed(true)} /> : <div role="img" aria-label={`Portrait unavailable for ${name}`} className="flex h-full items-center justify-center"><UserRound size={40} strokeWidth={1.5} className="text-grey" aria-hidden="true" /></div>}
    {src && !failed && <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-ink">DOCVY</span>}
  </div>;
}
