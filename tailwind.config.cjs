/** @type {import('tailwindcss').Config} */ 
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      ...colors,
      shade:{
        DEFAULT:"#EDEDF5",
        0:"#F3F4F9",
        1:"#ECECEC",
        2:"#A1A4B533",
        3:"#8A919C",
        4:"#999999",
        5:"#8F8F8F",
        6:"#F3F3F8",
        7:"#778599",
        dark:"#57606F"
      },
      secondary:{
        darkest:"#37178E",
        dark:"#4A2D99",
        light:"#f1e7fe"
      },
      alert:{
        DEFAULT:"#f28590"
      }
    },
  },
  plugins: [],
}