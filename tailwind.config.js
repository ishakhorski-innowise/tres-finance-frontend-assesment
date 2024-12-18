/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
	],
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      lato: ['Lato', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        neutral: {
          200: '#FAFAFC',
          400: '#F0F1F5',
          500: '#D2D3D7',
          700: '#8E8F98',
          800: '#5A5A5E',
          900: '#35383C',
          1100: '#1F1F1F'
        },
        blue: {
          300: '#DEEAFF'
        }
      }
    }
  },
  plugins: [],
}