import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { plum: "#402442", mulb: "#653B60", sand: "#F5EFE6", porc: "#FFFCF8", lav: "#E8DDF0", rose: "#D7B9C8", ink: "#29232D", grey: "#746C75", line: "#E5DCD7" },
    fontFamily: { head: ["var(--font-head)", "Inter", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1200px" }
  } }, plugins: []
} satisfies Config;
