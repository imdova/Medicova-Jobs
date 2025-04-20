/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmSerifDisplay: ["var(--font-dmSerif)"],
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        "primary-100": "var(--primary-100)",
        "primary-900": "var(--primary-900)",
        "primary-foreground": "var(--primary-foreground)",
        "primary-transparent": "var(--primary-transparent)",
        "light-primary": "var(--light-primary)",
        "light-primary-transparent": "var(--light-primary-transparent)",
        main: "var(--text-main)",
        secondary: "var(--text-secondary)",
      },
      scale: {
        102: "1.02",
      },
      boxShadow: {
        soft: "0 0 15px 0 rgba(0,0,0,0.05)",
      },
      borderRadius: {
        base: "10px",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
