import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { plum: "#402442", mulb: "#402442", sand: "#f5efe6", porc: "#FFFFFF", lav: "#f3eaf3", rose: "#F4C5A8", ink: "#402442", grey: "#594c55", line: "#e4d8cf" },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1200px" }
  } }, plugins: []
} satisfies Config;
