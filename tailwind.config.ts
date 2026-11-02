import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { plum: "#173A37", mulb: "#087F83", sand: "#F6FAF8", porc: "#FFFFFF", lav: "#EAF5F1", rose: "#F4C5A8", ink: "#173A37", grey: "#526D66", line: "#DCEAE5" },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-head)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1200px" }
  } }, plugins: []
} satisfies Config;
