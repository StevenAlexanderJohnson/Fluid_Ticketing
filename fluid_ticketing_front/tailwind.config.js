/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9fb734',
          dark: '#b3cb48',
        },
        secondary: {
          light: '#d2eec3',
          dark: '#1f3c11'
        },
        accent: {
          light: '#5bb332',
          dark: '#75cd4c'
        },
        background: {
          light: '#ffffff',
          dark: '#000000'
        },
        text: {
          light: '#281f0b',
          dark: '#f4ebd7'
        },
      }
    },
  },
  plugins: [],
}

