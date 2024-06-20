/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
colors:{
  'custom-head': '#333',
  'custom-search':'#3f3f3f',
  'notification':'#003566',
  'line':'#C3BDAB'
},
width: {
  'custom-width': '37%',
},
    },
  },
  plugins: [],
}

