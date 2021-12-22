module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#be8aa3",
          100: "#b48099",
          200: "#aa768f",
          300: "#a06c85",
          400: "#96627b",
          500: "#8c5871",
          600: "#824e67",
          700: "#78445d",
          800: "#6e3a53",
          900: "#643049",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#faf5ff",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
