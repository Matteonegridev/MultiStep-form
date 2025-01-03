import fluid, {extract} from 'fluid-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  extract,
  theme: {
        /** @type {import('fluid-tailwind').FluidThemeConfig} */
        fluid: ({ theme }) => ({
          defaultScreens: ['20rem', '96.25rem']
        }),
    extend: {},
  },
  plugins: [fluid,
    function ({ addBase }) {
      addBase({
        html: {
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "text-rendering": "optimizeLegibility",
        },
      });
    },
  ]
};
