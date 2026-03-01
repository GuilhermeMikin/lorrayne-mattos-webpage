import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6b8e6b",
          dark: "#4a6b4a",
          light: "#d4e4d4"
        }
      }
    }
  },
  plugins: []
};

export default config;
