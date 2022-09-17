/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        galaxy: "url('/Fundo.png')",
        'gradient': 'linear-gradient(89.86deg, #9572fc 23.88%, #43e7ad 33.94%, #e1d55d 44.57%)',  
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.9) 67.88%)',

      } 
    },
  },
  plugins: [],
}
