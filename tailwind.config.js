module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Alegreya", "serif"],
      body: ["Source Sans Pro", "serif"],
    },
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      gridTemplateRows: {
        layout: "100px, repeat(9, minmax(200px, 1fr))",
        test: "450px 1fr",
      },
      gridTemplateColumns: {
        layout: "repeat(12, 1fr)",
        // test: "repeat(auto-fill, minmax(350px, 1fr))",
      },

      colors: {
        light: "var(--primary)",
        "light-2": "var(--secondary)",
        "light-3": "var(--ternary)",
        "light-accent": "var(--accent)",
        "light-extra-one": "var(--extra-one)",
        "light-extra-two": "var(--extra-two)",
        "light-background-primary": "var(--bg-primary)",
        "light-background-secondary": "var(--bg-secondary)",

        // dark
        dark: "var(--dark-primary)",
        "dark-2": "var(--dark-secondary)",
        "dark-3": "var(--dark-ternary)",
        "dark-accent": "var(--dark-accent)",
        "dark-extra-one": "var(--dark-extra-one)",
        "dark-extra-two": "var(--dark-extra-two)",
        "dark-background-primary": "var(--dark-bg-primary)",
        "dark-background-secondary": "var(--dark-bg-secondary)",
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
