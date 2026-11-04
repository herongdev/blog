import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_PATH || '/projects/enterprise/sampling-station/';
  const apiBase = (env.VITE_API_BASE_URL || `${base.replace(/\/?$/, '/')}api`).replace(/\/$/, '');
  // The browser uses the public project prefix in development too. Only the
  // local proxy translates it to the Java service's internal /api routes.
  const localApi = apiBase.startsWith('/') && !apiBase.startsWith('//');
  const proxyKey = `^${apiBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:/|$)`;
  return {
    base,
    plugins: [react()],
    server: {
      proxy: localApi ? {
        [proxyKey]: {
          target: env.API_PROXY_TARGET || 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: path => `/api${path.slice(apiBase.length)}`,
        },
      } : {},
    },
  };
});
