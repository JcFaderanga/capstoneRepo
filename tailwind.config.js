/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
            ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#F42F47",
        customgray: "#3D3D3D",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        interbold: ["Inter_28pt-ExtraBold", "sans-serif"],
        interregular: ["Inter_18pt-Regular", "sans-serif"],
        interRegularBold: ["Inter_18pt-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

