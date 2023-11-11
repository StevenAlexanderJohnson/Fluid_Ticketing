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
          DEFAULT: '#9fb734',
          dark: '#b3cb48',
        },
        secondary: {
          DEFAULT: '#d2eec3',
          dark: '#1f3c11'
        },
        accent: {
          DEFAULT: '#5bb332',
          dark: '#75cd4c'
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000'
        },
        text: {
          DEFAULT: '#281f0b',
          dark: '#f4ebd7'
        },
      }
    },
  },
  plugins: [],
}

