import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#b8896d",
          dark: "#8a624a",
          light: "#e7d1c3"
        }
      }
    }
  },
  plugins: []
};

export default config;
