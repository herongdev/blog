import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import { SITE_URL, BASE_PATH } from './src/config/site.mjs';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'always',
  integrations: [vue()],
  // Shared Vue concepts live in apps/blog; resolve their runtime from this app.
  vite: { resolve: { dedupe: ['vue'] } },
});
