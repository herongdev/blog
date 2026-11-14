import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import product from '@app/config/product.json' with { type: 'json' };

export default defineConfig({
  site: product.origin,
  output: 'static',
  integrations: [react()],
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { host: '127.0.0.1', port: 4321 },
});
