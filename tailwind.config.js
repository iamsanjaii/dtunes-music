/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        customRed: "#ef623d",
        customPink: "#fff2f0",
        mono: "#f59f89",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(239,87,22,1) 0%, rgba(255,128,112,1) 100%)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
