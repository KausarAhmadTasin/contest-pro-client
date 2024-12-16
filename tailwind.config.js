import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6499E9", // Amber
        secondary: "#F97316", // Deep Orange
        accent: "#F4F2EE", // Lime Green
        neutral: "#F5F5F5", // Light Neutral
        Text: "#37474F", // Slate Gray
        secondaryText: "#607D8B", // Lighter Gray
        "heading-text": "#212121", // Charcoal
      },
      fontFamily: {
        roboto: ["Raleway"], // Add your Google Font here
      },
    },
  },

  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
