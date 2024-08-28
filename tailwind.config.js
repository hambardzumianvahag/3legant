/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
      backgroundImage: {
        shop: "url('./src/img/bg-image.png')",
        join: "url('./img/join-image.png')",
      },
    },
  },
  plugins: [],
};
