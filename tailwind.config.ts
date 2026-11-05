import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      plum: "#402442", mulberry: "#653B60", sand: "#F5EFE6", porcelain: "#FFFCF8",
      lavender: "#E8DDF0", rose: "#D7B9C8", ink: "#29232D", grey: "#746C75", taupe: "#E5DCD7",
      primary: "var(--primary)", "primary-hover": "var(--primary-hover)", "primary-tint": "var(--primary-tint)",
      surface: "var(--surface)", line: "var(--border)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)", porc: "var(--bg)",
    },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "12px" }, maxWidth: { site: "1120px" },
  } }, plugins: [],
} satisfies Config;
