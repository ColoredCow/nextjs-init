import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "#E0FCFF",
          200: "#BEF8FD",
          300: "#87EAF2",
          400: "#54D1DB",
          500: "#38BEC9",
          600: "#2CB1BC",
          700: "#14919B",
          800: "#0E7C86",
          900: "#0A6C74",
        },
        neutral: {
          100: "#F0F4F8",
          200: "#D9E2EC",
          300: "#BCCCDC",
          400: "#9FB3C8",
          500: "#829AB1",
          600: "#627D98",
          700: "#486581",
          800: "#334E68",
          900: "#243B53",
        },
        red: {
          100: "#FFEEEE",
          200: "#FACDCD",
          300: "#F29B9B",
          400: "#E66A6A",
          500: "#D64545",
          600: "#BA2525",
          700: "#A61B1B",
          800: "#911111",
          900: "#780A0A",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
