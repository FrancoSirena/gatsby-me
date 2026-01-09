import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: 'https://francosirena.com',
  integrations: [react(), sitemap()],
  srcDir: "./src",
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark',
      },
    },
  },

  devToolbar: {
    enabled: false
  },

});