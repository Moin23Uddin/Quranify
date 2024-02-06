/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*html"],
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

