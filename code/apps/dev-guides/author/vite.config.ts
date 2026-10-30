import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const authorRoot = fileURLToPath(new URL('.', import.meta.url));
const stylesRoot = fileURLToPath(new URL('../src/styles/', import.meta.url));
const dataRoot = fileURLToPath(new URL('../src/data/', import.meta.url));

export default defineConfig({
  base: process.env.AUTHOR_BASE_PATH || '/',
  plugins: [react()],
  server: {
    fs: {
      strict: true,
      allow: [authorRoot, stylesRoot, dataRoot],
      deny: ['.env', '.env.*', '**/drafts/**', '**/src/content/**', '**/templates/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
