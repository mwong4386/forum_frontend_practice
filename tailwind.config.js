/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  important: 'body', //__next seems not work for some mui components, i.e. Drawer, it will go outside __next div, so we need to use body
  theme: {
    extend: {},
    /* screen value follow mui */
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
