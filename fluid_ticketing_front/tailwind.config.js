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
          light: 'rgb(210,238,195)',
          light30: 'rgba(210,238,195, 0.30)',
          light03: 'rgba(210,238,195, 0.03)',
          dark: 'rgb(31,60,17)',
          dark30: 'rgb(31,60,17, 0.30)',
          dark03: 'rgb(31,60,17, 0.03)',
        },
        accent: {
          light: '#5bb332',
          dark: '#75cd4c'
        },
        background: {
          light: 'rgba(255, 255, 255, 1)',
          light30: 'rgba(255, 255, 255, 0.30)',
          light03: 'rgba(255, 255, 255, 0.03)',
          dark: 'rgba(0, 0, 0, 1)',
          dark30: 'rgba(0, 0, 0, 0.30)',
          dark03: 'rgba(0, 0, 0, 0.03)'
        },
        text: {
          light: '#281f0b',
          dark: '#f4ebd7'
        },
      }
    },
    gridTemplateColumns: {
      'nav': 'auto 4fr',
      '1': 'repeat(1, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
    }
  },
  plugins: [],
}

