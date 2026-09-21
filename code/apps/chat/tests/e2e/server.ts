import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const { createApp }: typeof import("../../server/app") = await import(
  pathToFileURL(resolve("dist/server/app.js")).href
);

// Exercise the production build with an isolated API. Never load .env.local.
const app = await createApp({
  env: {},
  staticRoot: resolve("dist/client"),
  fetcher: async () => {
    throw new Error("E2E must not reach external providers");
  },
});
app.enableShutdownHooks();
await app.listen(Number(process.env.E2E_PORT || 4173), "127.0.0.1");
