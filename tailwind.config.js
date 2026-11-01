/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        void: {
          950: '#030508',
          900: '#070a10',
          850: '#0c101a',
          800: '#111726',
          750: '#172033',
          700: '#1f2a42',
          600: '#2d3b59',
        },
        cyber: {
          emerald: '#10b981',
          mint: '#00f2a1',
          cyan: '#06b6d4',
          sky: '#38bdf8',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-glow': 'laserGlow 4s linear infinite',
      },
      keyframes: {
        laserGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    }
  },
  plugins: [],
}
