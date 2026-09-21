import { preferencesBootstrap } from "./scripts/vite/preferences-bootstrap.ts";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export const sourceAliases = {
  "@": fileURLToPath(new URL("./src", import.meta.url)),
  "@shared": fileURLToPath(new URL("./shared", import.meta.url)),
  "@vendor": fileURLToPath(new URL("./third_party", import.meta.url)),
};

export default defineConfig(({ mode }) => {
  const port = loadEnv(mode, process.cwd(), "PORT").PORT || "3001";
  return {
    plugins: [preferencesBootstrap(), react()],
    resolve: { alias: sourceAliases },
    build: { outDir: "dist/client" },
    server: {
      port: 5173,
      strictPort: true,
      proxy: { "/api": `http://127.0.0.1:${port}` },
    },
  };
});
