/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './assets/js/**/*.js',
    './data/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        electric: '#0A6CFF',
        royal: '#1F4FE0',
        violet: '#5B3FE0',
        silver: '#D9DEE8',
        mist: '#F2F5FA',
        navy: '#050B1F',
        steel: '#6B7588',
        'steel-light': '#8A94A6',
      },
      fontFamily: {
        cairo: ['Cairo', 'Tahoma', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', "'Helvetica Neue'", 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0A6CFF, #5B3FE0)',
      },
      boxShadow: {
        'electric-glow': '0 0 0 1px rgba(10,108,255,0.3), 0 0 20px rgba(10,108,255,0.15)',
        'electric-glow-lg': '0 0 0 1px rgba(10,108,255,0.4), 0 0 40px rgba(10,108,255,0.2)',
      },
    },
  },
  plugins: [],
};
