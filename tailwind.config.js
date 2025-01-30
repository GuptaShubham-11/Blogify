/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A5D67", // Deep Teal
        secondary: "#F4A261", // Warm Orange
        accent: "#E76F51", // Soft Red
        background: "#F8F9FA", // Off-White
        text: "#2D2D2D", // Dark Gray
      },
    },
  },
  plugins: [],
}
