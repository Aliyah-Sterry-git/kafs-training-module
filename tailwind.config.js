/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#0b1a3a",
          mid: "#101f4d",
          light: "#1a237e",
          accent: "#00E5FF",
          soft: "#D9E1F2",
        },
      },
    },
  },
  plugins: [],
}

