import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://instalacionesgarciasfronted.vercel.app",
  integrations: [
    react(),
    sitemap(),
    tailwind({
      applyBaseStyles: false, // We use our own global.css
    }),
  ],

  vite: {
    plugins: [],
    build: {
      // Enable minification
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info"],
        },
      },
      // Code splitting configuration
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-motion": ["framer-motion"],
            "vendor-icons": ["lucide-react"],
          },
        },
      },
      chunkSizeWarningLimit: 500,
      // Ensure CSS is properly processed
      cssCodeSplit: true,
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
  },
});
