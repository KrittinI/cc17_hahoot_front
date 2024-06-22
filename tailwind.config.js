/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#FB7185',
        darkred: '#FF3D5A',
        blue: '#60A5FA',
        darkblue: '#2587FF',
        yellow: '#FFDA45',
        darkyellow: '#FFCC00',
        green:'#4ADE80',
        darkgreen:'#00CB4A',
        black:'#171717',
        grey:'#D9D9D9',
        darkgrey:'#969A9D',
      },
      backgroundImage: {
        'custom-image': "url('src/assets/greenBackground.jpg')",
      }
    },
  },
  plugins: [],
}
