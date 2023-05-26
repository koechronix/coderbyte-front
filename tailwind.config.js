/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#F7FAFC',
          100: '#5F6AF6',
          150: '#148016',
          200: '#026CDF',
          250: '#ffc439',
          300: '#FFB3C7',
          350: '#6F7287',
        }
      },
      width: {
        25: '6.25rem'
      },
    },
  },
  plugins: [],
}

