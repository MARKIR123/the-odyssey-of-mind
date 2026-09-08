/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Lora"', '"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        dialectic: ['"Lora"', '"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        classical: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        epoch: {
          bg: 'var(--epoch-bg)',
          card: 'var(--epoch-card)',
          text: 'var(--epoch-text)',
          muted: 'var(--epoch-muted)',
          accent: 'var(--epoch-accent)',
          border: 'var(--epoch-border)',
          glow: 'var(--epoch-glow)',
          secondary: 'var(--epoch-secondary)',
          glass: 'var(--epoch-glass)',
        }
      },
      boxShadow: {
        'liquid': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'liquid-glow': '0 12px 40px 0 var(--epoch-glow), inset 0 0 0 1px rgba(255, 255, 255, 0.18)',
        'art-frame': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--epoch-border)',
        'spotlight': '0 0 80px -20px var(--epoch-glow)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
