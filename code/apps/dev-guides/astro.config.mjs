import { defineConfig } from 'astro/config';
import { BASE_PATH, DEFAULT_SITE_URL } from './src/config/site.mjs';

const site = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export default defineConfig({
  site,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'always',
});
