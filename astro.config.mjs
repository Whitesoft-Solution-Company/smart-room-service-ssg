// @ts-check
import { defineConfig, envField } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  outDir: "dist",
  trailingSlash: "never",
  output: "server",

  adapter: netlify({
    edgeMiddleware: true
  }),

  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
    }
  },

  integrations: [alpinejs(), icon()],

  env: {
    schema: {
      STRAPI_API: envField.string({ context: "client", access: "public", optional: true }),
    }
  },

  i18n: {
    locales: ['en', 'th', 'zh'],
    defaultLocale: "en"
  }
});