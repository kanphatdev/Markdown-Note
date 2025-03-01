/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff0097",
          "secondary": "#00e7ff",
          "accent": "#5edd00",
          "neutral": "#000608",
          "base-100": "#f0ffff",
          "info": "#00e6ff",
          "success": "#00ba73",
          "warning": "#c95b00",
          "error": "#ff5f6a",
        },
      },
    ],
  },
};
 