import type { Plugin } from "vite";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";

export function preferencesBootstrap(): Plugin {
  return {
    name: "preferences-before-paint",
    transformIndexHtml: {
      order: "pre",
      async handler() {
        const result = await build({
          entryPoints: [
            fileURLToPath(
              new URL("../../src/preferences/bootstrap.ts", import.meta.url),
            ),
          ],
          bundle: true,
          write: false,
          minify: true,
          format: "iife",
          platform: "browser",
        });
        return [
          {
            tag: "script",
            attrs: { "data-preferences-bootstrap": "" },
            children: result.outputFiles[0].text.replace(
              /<\/script/gi,
              "<\\/script",
            ),
            injectTo: "head-prepend",
          },
        ];
      },
    },
  };
}
