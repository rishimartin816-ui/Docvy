import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { plum: "#151518", mulb: "#202124", sand: "#fafafb", porc: "#FFFFFF", lav: "#f0eff8", rose: "#F4C5A8", ink: "#151518", grey: "#545761", line: "#e5e5ea" },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1200px" }
  } }, plugins: []
} satisfies Config;
