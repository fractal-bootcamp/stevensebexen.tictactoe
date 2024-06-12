const gridInner = require('@michaelallenwarner/tailwind-grid-inner');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'restartGame': 'restartGame 3s ease-in-out infinite'
      },
      keyframes: {
        'restartGame': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [gridInner],
}

