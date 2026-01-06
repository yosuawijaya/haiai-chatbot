import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#d4cfc3',
          400: '#c4b89e',
          500: '#b5a686',
        },
        sand: {
          400: '#c9b896',
          500: '#b8a67c',
          600: '#a89060',
        },
      },
      animation: {
        'blob-1': 'blob1 25s ease-in-out infinite',
        'blob-2': 'blob2 30s ease-in-out infinite',
        'blob-3': 'blob3 20s ease-in-out infinite',
        'blob-4': 'blob4 22s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(60px, 60px) scale(1.15) rotate(90deg)' },
          '50%': { transform: 'translate(-40px, 100px) scale(0.9) rotate(180deg)' },
          '75%': { transform: 'translate(50px, -40px) scale(1.1) rotate(270deg)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(-70px, -50px) scale(1.2) rotate(-90deg)' },
          '50%': { transform: 'translate(60px, -70px) scale(0.85) rotate(-180deg)' },
          '75%': { transform: 'translate(-50px, 60px) scale(1.15) rotate(-270deg)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(100px, -80px) scale(1.25)' },
          '66%': { transform: 'translate(-80px, 50px) scale(0.8)' },
        },
        blob4: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(-90px, 90px) scale(1.2) rotate(180deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(212, 165, 116, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
export default config
