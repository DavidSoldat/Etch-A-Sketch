/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        main: '#B9B7A7',
        light: '#7C90A0',
        dark: '#4E5166',
      },
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
