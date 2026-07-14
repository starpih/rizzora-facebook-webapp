import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        rizzora: {
          bg: "#191833",
          panel: "#232142",
          surface: "#322f55",
          line: "#4A456C",
          pink: "#EA4EB8",
          rose: "#FF68C9",
          gold: "#F5B937",
          text: "#F7F1FF",
          muted: "#AAA0C3"
        }
      },
      boxShadow: {
        aura: "0 0 28px rgba(234, 78, 184, 0.45)",
        panel: "0 20px 60px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
