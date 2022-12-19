/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2148c0',
        'primary-variant': '#244dcc'
      },
      height: {
        screen: 'calc(var(--screen-height) * 100)'
      }
    }
  }
}