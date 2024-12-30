/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmSerifDisplay: ["var(--font-dmSerif)"],
        baiJamJuree: ["var(--font-baiJamjuree)"],
      },
      colors: {
        primary: "var(--primary)",
        "primary-100": "var(--primary-100)",
        "primary-900": "var(--primary-900)",
        "primary-foreground": "var(--primary-foreground)",
        "primary-transparent": "var(--primary-transparent)",
        "light-primary": "var(--light-primary)",
        "light-primary-transparent": "var(--light-primary-transparent)",
        main: "var(--text-main)",
        secondary: "var(--text-secondary)",
      },
    },
  },
  plugins: [],
};
