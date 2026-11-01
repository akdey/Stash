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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0e15',
          850: '#10141d',
          800: '#161b26',
          750: '#1e2534',
          700: '#273042',
          600: '#38435c',
        },
        brand: {
          500: '#22c55e',
          400: '#4ade80',
          300: '#86efac',
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
        },
        sky: {
          500: '#0ea5e9',
          400: '#38bdf8',
        }
      }
    }
  },
  plugins: [],
}

