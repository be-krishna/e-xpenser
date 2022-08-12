/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
        'serif': ['Noto Serif', ...defaultTheme.fontFamily.serif],
        'mono': ['Source Sans Pro', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
        /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })],
}
