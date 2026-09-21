import dotenv from "dotenv";
import { resolve } from "node:path";
import { createApp } from "./app";
import { readRuntimeConfig } from "./common/runtime-config";

const production = process.argv.includes("--production");
if (!production) dotenv.config({ path: [".env.local", ".env"], quiet: true });
const runtime = readRuntimeConfig();
const app = await createApp({
  requestLogger: (entry) => console.info(JSON.stringify(entry)),
  staticRoot: production ? resolve("dist/client") : undefined,
});
app.enableShutdownHooks();
await app.listen(runtime.port, runtime.bindAddress);
console.info(
  JSON.stringify({
    event: "listening",
    address: runtime.bindAddress,
    port: runtime.port,
  }),
);
