/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#FB7185",
        darkred: "#FF3D5A",
        blue: "#60A5FA",
        darkblue: "#2587FF",
        yellow: "#FFDA45",
        darkyellow: "#FFCC00",
        green: "#4ADE80",
        darkgreen: "#00CB4A",
        black: "#171717",
        grey: "#D9D9D9",
        darkgrey: "#969A9D",
      },
      fontSize: {
        "font-logo": [
          "2rem",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "font-header": [
          "5rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.01em",
            fontWeight: "800",
          },
        ],
        "font-title": [
          "1.875rem",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "font-title-card": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.02em",
            fontWeight: "500",
          },
        ],
        "font-btn": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "font-body": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.02em",
            fontWeight: "300",
          },
        ],
        "font-valid": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "300",
          },
        ],
      },
      backgroundImage: {
        "custom-image": "url('src/assets/greenBackground.jpg')",
      },
      outline: {
        "blue-bottom-solid-2": ["2px solid blue", "0 0 2px 0"],
      },
    },
  },
  variants: {},
  plugins: [],
};
