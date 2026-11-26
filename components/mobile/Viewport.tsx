"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

const InitialMobile = createContext(false);
const query = "(max-width: 767px)";

function subscribe(update: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}

export function ViewportProvider({ initialMobile, children }: { initialMobile: boolean; children: ReactNode }) {
  return <InitialMobile.Provider value={initialMobile}>{children}</InitialMobile.Provider>;
}

export function useMobile() {
  const initial = useContext(InitialMobile);
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => initial);
}

export function ResponsivePage({ mobile, children }: { mobile: ReactNode; children: ReactNode }) {
  return useMobile() ? mobile : children;
}
