/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Ensure this is set to 'class'

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

