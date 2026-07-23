/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#213F7D",
          navy: "#213F7D",
          muted: "#545F7D",
          aqua: "#39CDCC",
        },
        border: "#E5EAF2",
      },
      fontFamily: {
        avenir: ["Avenir Next", "Avenir", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      boxShadow: {
        card: "3px 5px 20px rgba(0, 0, 0, 0.04)",
        nav: "0 5px 20px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
