import { defineConfig } from 'vite';
export default defineConfig({
  base: '/admin/',
  server: { host: '127.0.0.1', port: 4318, strictPort: true, proxy: { '/admin/api': 'http://127.0.0.1:4140', '/invite/info': 'http://127.0.0.1:4140', '/invite/start': 'http://127.0.0.1:4140', '/invite/status': 'http://127.0.0.1:4140' } },
  build: { outDir: 'dist', emptyOutDir: true },
});
