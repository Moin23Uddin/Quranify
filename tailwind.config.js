/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*html", "*.js"],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(max-width: 1200px)' },
       
      },
      fontFamily:{
        'fontroboto':['Roboto', 'sans-serif'],
        'fonthonk':["Honk", "system-ui"],
      },
    },
  },
  plugins: [],
  mode: 'jit',
}

