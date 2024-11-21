/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        header1:'#faf7f2',
        header2:'#455d58'
      }
    },
  },
  plugins: [],
}