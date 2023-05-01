/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ], 
  darkMode: 'class',
  theme: {
    extend: {
       backgroundImage: {
        'header': "url('/src/assets/noah.png')",
      },
      fontFamily:{
        Maven:['Maven Pro', 'sans-serif']
      },
      colors:{
        'azul':'#013469',
        'dourado':'#CAAD6B',
        'entrada-card':'#33CC95',
        'saida-card':'#5429CC'
      }
    },
  },
  plugins: [
     require('@tailwindcss/forms')
     
  ],
}
