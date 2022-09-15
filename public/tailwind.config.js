/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,css}"];
export const theme = {
  screens: {
    'tablet': '640px',
    // => @media (min-width: 640px) { ... }
    'laptop': '1024px',
    // => @media (min-width: 1024px) { ... }
    'desktop': '1280px',
    // => @media (min-width: 1280px) { ... }
  },
};
export const plugins = [require('@tailwindcss/forms')];
