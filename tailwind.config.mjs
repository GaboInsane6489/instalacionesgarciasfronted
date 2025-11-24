/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#050505",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        "text-main": "#ededed",
        "text-muted": "#a1a1a1",
      },
    },
  },
  plugins: [],
};
