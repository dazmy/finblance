/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo-input': '3px 4px 0px black',
      },
      backgroundColor: {
        'button-neo-yellow': '#FFF59F'
      },
      fontFamily: {
        'kaushan': '"Kaushan Script"',
      }
    },
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px'
    }
  },
  plugins: [],
}