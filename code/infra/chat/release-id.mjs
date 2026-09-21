import { createHash } from "node:crypto";
import { readdir, readFile, readlink, lstat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(here, "../../apps/chat");
const roots = [
  "Dockerfile",
  "compose.yaml",
  "compose.local.yaml",
  "package.json",
  "package-lock.json",
  "tsconfig.base.json",
  "tsconfig.client.json",
  "tsconfig.json",
  "tsconfig.server.json",
  "tsconfig.tests.json",
  "index.html",
  "vite.config.ts",
  "vitest.config.ts",
  "playwright.config.ts",
  "scripts",
  "src",
  "shared",
  "server",
  "public",
  "tests",
  "third_party",
];
const hash = createHash("sha256");
async function add(path) {
  const info = await lstat(path);
  if (info.isDirectory()) {
    const entries = await readdir(path, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name)))
      await add(join(path, entry.name));
    return;
  }
  const name = relative(app, path).replaceAll("\\", "/");
  hash.update(`${name}\0${info.mode & 0o777}\0`);
  if (info.isSymbolicLink()) hash.update(await readlink(path));
  else hash.update(await readFile(path));
  hash.update("\0");
}
for (const root of roots) await add(join(app, root));
process.stdout.write(`${hash.digest("hex").slice(0, 12)}\n`);
