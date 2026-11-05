import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { primary: "var(--primary)", "primary-hover": "var(--primary-hover)", "primary-tint": "var(--primary-tint)", surface: "var(--surface)", ink: "var(--text)", grey: "var(--muted)", line: "var(--border)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)", porc: "var(--bg)" },
    fontFamily: { head: ["var(--font-head)", "Google Sans", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "10px" }, maxWidth: { site: "1120px" }
  } }, plugins: []
} satisfies Config;
