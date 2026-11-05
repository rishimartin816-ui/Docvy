import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      ink: "var(--text)", grey: "var(--muted)", primary: "var(--primary)",
      "primary-hover": "var(--primary-hover)", "primary-tint": "var(--primary-tint)",
      surface: "var(--surface)", line: "var(--border)", success: "var(--success)",
      warning: "var(--warning)", danger: "var(--danger)", porc: "var(--bg)",
      icon: {
        mint: "#E4F3EF", teal: "#24756B", blue: "#E8F0FB", cobalt: "#3E68A2",
        peach: "#FBECE7", coral: "#A8543B", cream: "#FBF1D9", amber: "#936513",
        lilac: "#F0EAF9", violet: "#7158A2", pink: "#FAE9ED", berry: "#A44968",
        sky: "#E5F4F8", ocean: "#33798B",
      },
    },
    fontFamily: { head: ["var(--font-head)", "system-ui", "sans-serif"], body: ["var(--font-body)", "system-ui", "sans-serif"] },
    borderRadius: { card: "16px", btn: "12px" }, maxWidth: { site: "1120px" },
  } }, plugins: [],
} satisfies Config;
