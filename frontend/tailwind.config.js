// Tailwind v4 is loaded through @tailwindcss/vite.
// This file is kept for editor tooling and future project-specific extensions.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        civic: {
          ink: '#17202A',
          teal: '#167D7F',
          mint: '#8FD6C3',
          gold: '#F2B84B',
          coral: '#E86952',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(23, 32, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
