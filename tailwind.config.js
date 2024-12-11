/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary_red: "#F42F47",
        primary_gray: "#3D3D3D",
      },
      fontFamily: {
        interbold: ["Inter_28pt-ExtraBold", "sans-serif"],
        interregular: ["Inter_18pt-Regular", "sans-serif"],
        interRegularBold: ["Inter_18pt-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}