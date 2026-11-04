import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const authorRoot = fileURLToPath(new URL('.', import.meta.url));
const stylesRoot = fileURLToPath(new URL('../src/styles/', import.meta.url));
const dataRoot = fileURLToPath(new URL('../src/data/', import.meta.url));
const brandStylesRoot = fileURLToPath(new URL('../../../packages/site/chrome/src/', import.meta.url));

export default defineConfig({
  base: process.env.AUTHOR_BASE_PATH || '/',
  plugins: [react()],
  server: {
    fs: {
      strict: true,
      allow: [authorRoot, stylesRoot, dataRoot, brandStylesRoot],
      deny: ['.env', '.env.*', '**/.publishing-private/**', '**/.content-workspace/**', '**/.article-revisions/**', '**/.history/**', '**/drafts/**', '**/src/content/**', '**/templates/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
