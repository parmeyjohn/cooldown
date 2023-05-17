/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xxs': '480px'
      }

    },
    
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
