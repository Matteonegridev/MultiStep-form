import fluid, { extract } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: { files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extract },
  theme: {
  	fluid: '({ theme }) => ({\n      defaultScreens: ["20rem", "96.25rem"],\n    })',
  	extend: {
  		colors: {
  			primary: 'var(--marine-blue)',
  			secondary: 'var(--purplish-blue)',
  			tertiary: 'var(--pastel-blue)',
  			quaternary: 'var(--light-blue)',
  			error: 'var(--strawberry-red)',
  			coolGray: 'var(--cool-gray)',
  			lightGray: 'var(--light-gray)',
  			magnolia: 'var(--magnolia)',
  			alabaster: 'var(--alabaster)',
  			white: 'var(--white)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    fluid,
    function ({ addBase }) {
      addBase({
        html: {
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "text-rendering": "optimizeLegibility",
        },
      });
    },
      require("tailwindcss-animate")
],
};
