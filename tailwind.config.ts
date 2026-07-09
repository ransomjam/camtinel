import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#05070E",
          900: "#0A0C18",
          800: "#111527",
          700: "#1A1F35",
          600: "#232948",
        },
        cm: {
          green: "#00A550",
          "green-dark": "#007A5E",
          "green-glow": "#12D170",
          yellow: "#FCD116",
          "yellow-dark": "#E5B900",
          red: "#CE1126",
          "red-dark": "#A50E1F",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "float-slow": "floatSlow 9s ease-in-out infinite",
        "float-slower": "floatSlow 14s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "drift-x": "driftX 22s linear infinite",
        "drift-x-rev": "driftXRev 22s linear infinite",
        "spin-slow": "spin 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        driftX: {
          "0%": { transform: "translateX(-4%)" },
          "100%": { transform: "translateX(4%)" },
        },
        driftXRev: {
          "0%": { transform: "translateX(4%)" },
          "100%": { transform: "translateX(-4%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
