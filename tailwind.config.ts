import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { plum: "#2e281f", mulb: "#70501f", sand: "#fffbf1", porc: "#FFFFFF", lav: "#fff3d9", rose: "#F4C5A8", ink: "#2e281f", grey: "#5d5040", line: "#e8dac2" },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1200px" }
  } }, plugins: []
} satisfies Config;
