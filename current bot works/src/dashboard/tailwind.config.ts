import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#08090e",
          surface: "#0d0f16",
          card: "#141720",
          "card-hover": "#1a1d2a",
          border: "#1f2233",
          "border-glow": "#2a2d42",
          gold: "#c9953c",
          "gold-light": "#e8c97a",
          "gold-dim": "#8a6a2f",
          slate: "#6b7280",
          muted: "#4b5263",
          text: "#e5e7eb",
        },
        status: {
          green: "#34d399",
          yellow: "#fbbf24",
          red: "#f87171",
          blue: "#60a5fa",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        data: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeSlideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
