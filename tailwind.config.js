/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "100%": { opacity: "1" },
          "0%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fadein 1s ease-in-out",
        "fade-out": "fadeout 1s ease-in-out",
      },
    },
  },
  plugins: [],
});
