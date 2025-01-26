import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#993270",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "#94A3B8",
        background: "var(--background)",
      },
      fontFamily: {
        sans: ["var(--font-epilogue)"],
        display: ["var(--font-redrose)"],
      },
    },
  },
  plugins: [],
};

export default config;
