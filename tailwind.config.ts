import type { Config } from "tailwindcss";

// Design-Tokens der So geht Eisenbahn GmbH (aus der aktuellen Website abgeleitet)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        petrol: {
          DEFAULT: "#406976", // Hero-Hintergrund, Footer, Überschriften
          light: "#689099", // Verlauf oben im Hero
          dark: "#2F5360",
          deep: "#1F3640", // Fließtext
          50: "#EEF3F4",
          100: "#DCE7E9",
        },
        accent: {
          DEFAULT: "#FAB33F", // Buttons, Häkchen, Pfeile, Ticker
          dark: "#E89A1C",
          ink: "#9A5800", // Orange für Text auf hellem Grund (WCAG AA)
          soft: "#FEF0D6",
        },
        surface: "#F7F7F7",
        frame: "#13232A", // Rahmen um die Stationen (wie ein Führerstand-Display)
        ink: "#1F3640",
      },
      fontFamily: {
        heading: ["var(--font-ubuntu)", "Ubuntu", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
      },
      maxWidth: {
        page: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,54,64,.06), 0 8px 24px -12px rgba(31,54,64,.18)",
        lift: "0 2px 4px rgba(31,54,64,.06), 0 18px 40px -16px rgba(31,54,64,.3)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        // Ohne Opacity: Hero-Text ist sofort sichtbar (gut für LCP), bewegt sich nur leicht ein
        rise: { from: { transform: "translateY(18px)" }, to: { transform: "none" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up .7s cubic-bezier(.16,1,.3,1) both",
        rise: "rise .8s cubic-bezier(.16,1,.3,1) both",
      },
    },
  },
};

export default config;
