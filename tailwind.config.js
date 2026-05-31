/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        primary: '#1a1208',
        accent: '#c9a96e',
        cream: '#f5ecd7',
        brand: {
          bg: '#0E0D0B',
          bg2: '#161412',
          primary: '#C29B70',
          secondary: '#E6D5C3',
          accent: '#A88258',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'cursor-glow': 'cursor-glow 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'marquee': 'marquee 20s linear infinite',
        'fadeUp': 'fadeUp 0.6s ease-out forwards',
        'staggerFade': 'staggerFade 0.6s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'cursor-glow': {
          '0%': { boxShadow: '0 0 8px #c9a96e' },
          '50%': { boxShadow: '0 0 16px #c9a96e' },
          '100%': { boxShadow: '0 0 8px #c9a96e' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
