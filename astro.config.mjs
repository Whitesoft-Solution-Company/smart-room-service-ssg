// @ts-check
import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from "@tailwindcss/vite";

import alpinejs from "@astrojs/alpinejs";

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
    define: {
      'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
    }
  },

  integrations: [alpinejs()],

  env: {
    schema: {
      API_BASE_URL: envField.string({ context: "client", access: "public", optional: false }),
      STRAPI_API: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});