/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        'dark-bg': '#020617',
        'dark-surface': '#0F172A',
        'dark-primary': '#7C3AED',
        'dark-secondary': '#22D3EE',
        'dark-accent': '#F97316',
        'dark-highlight': '#EC4899',
        'dark-text': '#E2E8F0',

        // Light Theme Colors
        'light-bg': '#F8FAFC',
        'light-surface': '#FFFFFF',
        'light-primary': '#4F46E5',
        'light-secondary': '#06B6D4',
        'light-accent': '#F59E0B',
        'light-highlight': '#EC4899',
        'light-text': '#0F172A',
      },
    },
  },
  plugins: [],
}