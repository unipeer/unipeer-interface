module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        16: "1rem",
        20: "1.25rem",
        32: "2rem",
      },
      borderRadius: {
        32: "2rem",
      },
      fontFamily: {
        headings: ["Jost"],
        paragraphs: ["Inter"],
      },
      colors: {
        "accent-1": "#fe5e44",
        "primary-100": "#feead9",
        "accent-2": "#eff1ff",
        "dark-blue-400": "#394392",
        "dark-blue-400": "#394392",
        "dark-black-900": "rgba(2, 4, 35, 0.7)",
        "dark-black-500": "#0e144a",
        "dark-200": "#a0aaec",
        "dark-300": "#6772c8",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
