/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xxs: "480px",
        "4xl": "900px",
        pc: "1920px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
