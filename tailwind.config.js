/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*html", "*.js"],
  theme: {
    extend: {

      fontFamily:{
        'fontroboto':['Roboto', 'sans-serif'],
        'fonthonk':["Honk", "system-ui"],
      },
    },
  },
  plugins: [],
  mode: 'jit',
}

