/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors : {
        'green' : '#3DB46D',
        'light-gray' : '#F8F9F8' ,
        'red' : '#EB5757'
      }
    },
  },
  plugins: [],
}
