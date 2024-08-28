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
      gridTemplateColumns: {
        "2-cols": "repeat(2, minmax(0, 1fr))",
        "3-cols": "repeat(3, minmax(0, 1fr))",
        "4-cols": "repeat(4, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
