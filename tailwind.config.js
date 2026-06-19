/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary:     "#BC1A22",
        primaryDark: "#870F14",
        onyx:        "#12161A",
        slate:       "#525D6B",
        alabaster:   "#F8F9FA",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 8px 30px rgb(0,0,0,0.04)",
        hover:   "0 20px 40px rgb(0,0,0,0.08)",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      maxWidth: { "8xl": "1280px" },
      keyframes: {
        kenBurns: { from:{transform:"scale(1.08)"}, to:{transform:"scale(1.0)"} },
        float:    { "0%,100%":{transform:"translateY(0)"},  "50%":{transform:"translateY(-8px)"} },
        shimmer:  { "0%":{backgroundPosition:"-200% center"}, "100%":{backgroundPosition:"200% center"} },
      },
      animation: {
        "ken-burns": "kenBurns 6s ease-out forwards",
        float:       "float 4s ease-in-out infinite",
        "float-delay":"float 4s ease-in-out 1.5s infinite",
      },
    },
  },
  plugins: [],
};
