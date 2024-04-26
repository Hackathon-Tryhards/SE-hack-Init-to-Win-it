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
      }
    },
  },
  plugins: [],
}