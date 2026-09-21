import { spawnSync } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const code = resolve(here, "../..");
const scripts = [resolve(here, "deploy.sh"), resolve(here, "remote-deploy.sh")];
for (const script of scripts) {
  const syntax = spawnSync("bash", ["-n", script], { encoding: "utf8" });
  if (syntax.status !== 0)
    throw new Error(syntax.stderr || `${script} 语法无效`);
  const source = await readFile(script, "utf8");
  const ambiguous = source.match(/\$[A-Za-z_][A-Za-z0-9_]*[^\x00-\x7f]/gu);
  if (ambiguous)
    throw new Error(
      `${script} 存在未用花括号隔开的非 ASCII 变量：${ambiguous.join(", ")}`,
    );
  if (((await stat(script)).mode & 0o111) === 0)
    throw new Error(`${script} 缺少可执行权限`);
}

const release = () => {
  const result = spawnSync(
    process.execPath,
    [resolve(here, "release-id.mjs")],
    {
      cwd: code,
      encoding: "utf8",
    },
  );
  if (result.status !== 0)
    throw new Error(result.stderr || "无法计算聊天应用版本");
  return result.stdout.trim();
};
const first = release();
if (!/^[a-f0-9]{12}$/.test(first) || release() !== first)
  throw new Error("聊天应用内容版本不稳定");

async function rejectPrivateEnv(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (
      [
        "node_modules",
        "dist",
        "output",
        ".playwright-cli",
        "local-docs",
      ].includes(entry.name)
    )
      continue;
    if (entry.name.startsWith(".env") && entry.name !== ".env.example")
      throw new Error(`子应用包含私有环境文件：${entry.name}`);
    if (entry.isDirectory()) await rejectPrivateEnv(resolve(path, entry.name));
  }
}
await rejectPrivateEnv(resolve(code, "apps/chat"));
console.info(`聊天应用部署检查通过：${first}`);
