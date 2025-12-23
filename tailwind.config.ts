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
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#FF4D4D', // Vibrant coral red
          light: '#FF6B6B',
          dark: '#E63946',
          yellow: '#FFE566', // Energetic yellow
          mint: '#4ECDC4', // Fresh mint
          purple: '#7C3AED', // Electric purple
        },
        cream: {
          DEFAULT: '#FDF8F3',
          dark: '#F5EDE4',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'grain': 'grain 0.5s steps(6) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'text-rotate': 'textRotate 0.5s ease-in-out',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        grain: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '100%': { transform: 'translate(5%, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textRotate: {
          '0%': { opacity: '0', transform: 'translateY(20px) rotateX(-20deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
