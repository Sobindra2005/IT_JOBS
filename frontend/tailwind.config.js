/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      keyframes: {
        'trans': {
          '0%': {   transform: 'translateY(100%)', opacity: '0' },
          '100%': {
            opacity: '1',
            transform: 'translateY(0%)'
          }
        },
      },
      animation: {
        'popup': 'trans 0.5s ease 0s forwards',
      },
      colors: {
        'custom-head': '#333',
        'custom-search': '#3f3f3f',
        'notification': '#003566',
        'line': '#C3BDAB'
      },
      width: {
        'custom-width': '37%',
        'post-width': '86%'
      },
    },
  },
  plugins: [],
}

