// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  outDir: "dist",
  trailingSlash: "never",
  output: "server",
  adapter: netlify({
    edgeMiddleware: true
  }),
  experimental: {
    svg: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});