import type { Config } from "tailwindcss";

// Design-Tokens aus dem Handoff (design/README.md)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#071C35", // dunkle Flächen, Text
          700: "#0E2A4C",
          600: "#1B3A60",
          500: "#33475E",
        },
        blue: {
          DEFAULT: "#005BAA", // Buttons, Akzente
          hover: "#1689E8",
          light: "#8FC3F5", // Text auf Navy, Mono-Labels
          tint: "#E3EEF8",
        },
        bg: "#F6F8FA",
        line: {
          DEFAULT: "#E8EDF2",
          input: "#D5DEE7",
        },
        muted: "#4B5B6E", // Fließtext sekundär
        "on-navy": {
          DEFAULT: "#DCE8F3",
          2: "#C5D6E6",
          footer: "#D6E6F5",
          dim: "#9FB6CC",
        },
        error: { DEFAULT: "#B42318", bg: "#FDECEC" },
        star: "#F4B400",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Archivo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        btn: "8px",
        card: "14px",
      },
      maxWidth: {
        page: "1360px",
      },
      boxShadow: {
        card: "0 24px 48px -24px rgba(7,28,53,.3)",
        quiz: "0 40px 80px -40px rgba(7,28,53,.55)",
        menu: "0 24px 60px -16px rgba(7,28,53,.45)",
        cookie: "0 30px 70px -20px rgba(7,28,53,.55)",
      },
      transitionTimingFunction: {
        rail: "cubic-bezier(.2,.7,.2,1)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        bounce: { "0%,100%": { transform: "translateY(0)", opacity: ".5" }, "50%": { transform: "translateY(6px)", opacity: "1" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        hint: "bounce 1.6s ease-in-out infinite",
      },
    },
  },
};

export default config;
