/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6",
        secondary: "#00B4D8",
        accent: "#FF9E00",
        background: "#F8F9FA",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        dark: "#1F2937",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
