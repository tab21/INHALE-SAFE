/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#273384",
        neonGreen: "#00F48E",
        neonBlue: "#2E91F7",
      },
      lineClamp: {
        20: "20",
      },
    },
  },
  plugins: [],
};
