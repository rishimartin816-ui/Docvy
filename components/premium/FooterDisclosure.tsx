"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function FooterDisclosure({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 620px)");
    const sync = () => {
      if (ref.current) ref.current.open = !mobile.matches;
    };
    sync();
    mobile.addEventListener("change", sync);
    return () => mobile.removeEventListener("change", sync);
  }, []);
  return (
    <details ref={ref} open>
      {children}
    </details>
  );
}
