/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        maingreen: "#3ECF8E",
        darkgrey: "#1c1c1c",
        lightgrey: "#232323",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      boxShadow: {
        'greenShadow': '10px 10px 10px 10px rgba(0, 128, 0, 0.1), 0 4px 6px -2px rgba(0, 128, 0, 0.05)',
      }
    },
  },
  plugins: [],
}