/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5A3C',
          foreground: '#FFFFFF',
          50: '#F7F3F0',
          100: '#EDE4DC',
          200: '#D9C5B5',
          300: '#C5A68E',
          400: '#B18767',
          500: '#8B5A3C',
          600: '#734A31',
          700: '#5B3A26',
          800: '#432A1C',
          900: '#2B1A11',
        },
        secondary: {
          DEFAULT: '#6B7280',
          foreground: '#FFFFFF',
        },
        museum: {
          gold: '#D4AF37',
          cream: '#F5F5DC',
          burgundy: '#722F37',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}