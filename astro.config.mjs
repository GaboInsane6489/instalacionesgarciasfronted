// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://instalacionesgarciasfronted.vercel.app",
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Enable minification
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info"],
        },
      },
      // Code splitting configuration
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor code
            "vendor-react": ["react", "react-dom"],
            "vendor-motion": ["framer-motion"],
            "vendor-icons": ["lucide-react"],
          },
        },
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
    },
    // Enable CSS minification
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});
