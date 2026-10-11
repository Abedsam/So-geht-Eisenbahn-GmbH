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
        muted: {
          DEFAULT: "#4B5B6E", // Fließtext sekundär
          foreground: "#4B5B6E", // shadcn-Name für dieselbe Farbe
        },
        // shadcn/ui-Farbnamen, auf die Markenfarben abgebildet
        background: "#FFFFFF",
        foreground: "#071C35",
        card: { DEFAULT: "#FFFFFF", foreground: "#071C35" },
        border: "#E8EDF2",
        input: "#D5DEE7",
        ring: "#1689E8",
        primary: { DEFAULT: "#005BAA", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#F6F8FA", foreground: "#071C35" },
        accent: { DEFAULT: "#F6F8FA", foreground: "#005BAA" },
        destructive: { DEFAULT: "#B42318", foreground: "#FFFFFF" },
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
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        bounce: { "0%,100%": { transform: "translateY(0)", opacity: ".5" }, "50%": { transform: "translateY(6px)", opacity: "1" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        hint: "bounce 1.6s ease-in-out infinite",
        "accordion-down": "accordion-down .3s cubic-bezier(.2,.7,.2,1)",
        "accordion-up": "accordion-up .25s cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
};

export default config;
