module.exports = {
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        float: "float 4s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.5s ease-in-out"
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        }
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(90deg, #7c3aed, #ec4899)'
      }
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'],
      backgroundImage: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
  ],
}