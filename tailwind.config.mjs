/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#6B6FD1',
        'primary-red': '#DD6383',
        'dark-purple': '#535085',
        'third-yellow': '#FFD93D',
        'white-smoke': '#EEEEEE',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.8125rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '500' }],
        'paragraph': ['1.5rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
