/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'boldonse': ['Boldonse', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 