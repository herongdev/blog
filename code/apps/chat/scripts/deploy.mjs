import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export function docker(args, env = process.env) {
  return execFileSync("docker", args, {
    cwd: root,
    env,
    encoding: "utf8",
    timeout: 120_000,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

// The container suite calls this same release operation against isolated Compose services.
export async function deployApplication({
  compose,
  image,
  env = process.env,
  verify = async () => {},
}) {
  const current = docker([...compose, "ps", "--all", "--quiet", "app"], env);
  const previous = current
    ? docker(["inspect", "--format", "{{.Image}}", current], env)
    : undefined;
  // Resolve a tag once. Both deployment and rollback use immutable local image IDs.
  const next = docker(["image", "inspect", "--format", "{{.Id}}", image], env);
  const start = (target) => {
    const runtimeEnv = { ...env, APP_IMAGE: target };
    docker(
      [
        ...compose,
        "up",
        "--detach",
        "--no-build",
        "--no-deps",
        "--wait",
        "--wait-timeout",
        "60",
        "app",
      ],
      runtimeEnv,
    );
    const id = docker([...compose, "ps", "--quiet", "app"], runtimeEnv);
    if (
      docker(
        [
          "inspect",
          "--format",
          "{{if .State.Health}}{{.State.Health.Status}}{{end}}",
          id,
        ],
        runtimeEnv,
      ) !== "healthy"
    )
      throw new Error("应用没有通过容器健康检查。");
  };
  try {
    start(next);
    await verify({ ...env, APP_IMAGE: next });
    return { current: next, previous };
  } catch (error) {
    try {
      if (previous) start(previous);
      else docker([...compose, "stop", "app"], { ...env, APP_IMAGE: next });
    } catch {
      throw new Error("发布失败，旧镜像恢复也失败，请检查容器状态和配置。", {
        cause: error,
      });
    }
    throw new Error(
      previous
        ? "发布失败，已恢复旧镜像并通过健康检查。"
        : "首次发布失败，已停止应用。",
      { cause: error },
    );
  }
}

async function main() {
  const [mode, target, config = ".env.deploy"] = process.argv.slice(2);
  if (!["local", "production"].includes(mode) || !target)
    throw new Error(
      "用法：node scripts/deploy.mjs local|production 镜像引用|--rollback [配置文件]",
    );
  const configPath = resolve(root, config);
  const project = `zhixu-${mode}`;
  const stateDir = resolve(root, "output/deploy", project);
  await mkdir(stateDir, { recursive: true, mode: 0o700 });
  const lock = resolve(stateDir, "lock");
  await mkdir(lock).catch(() => {
    throw new Error(
      "已有发布正在进行；若上次进程意外退出，请确认没有发布进程后移除 output/deploy 中的 lock 目录。",
    );
  });
  try {
    const compose = [
      "compose",
      "--project-name",
      project,
      "--env-file",
      configPath,
      "-f",
      "compose.yaml",
      "-f",
      `compose.${mode}.yaml`,
    ];
    docker([...compose, "config", "--quiet"]);
    const statePath = resolve(stateDir, "state.json");
    const state = await readFile(statePath, "utf8")
      .then(JSON.parse)
      .catch(() => undefined);
    if (state && state.config !== configPath)
      throw new Error("此部署使用了另一份配置文件，请使用原配置路径。");
    const image = target === "--rollback" ? state?.previous : target;
    if (!image) throw new Error("没有可回滚的上一版镜像。");
    if (mode === "production") {
      docker([
        ...compose,
        "run",
        "--rm",
        "--no-deps",
        "gateway",
        "caddy",
        "validate",
        "--config",
        "/etc/caddy/Caddyfile",
      ]);
    }
    const result = await deployApplication({
      compose,
      image,
      verify: async (env) => {
        if (mode === "production") {
          docker(
            [
              ...compose,
              "up",
              "--detach",
              "--no-build",
              "--no-deps",
              "gateway",
            ],
            env,
          );
          // Exercise TLS and the shared access gate without reading its credentials.
          const gateway = docker([...compose, "ps", "--quiet", "gateway"], env);
          const domain = docker(
            ["exec", gateway, "printenv", "SITE_HOST"],
            env,
          );
          let lastError;
          for (let attempt = 0; attempt < 20; attempt++) {
            try {
              const response = await fetch(`https://${domain}/api/healthz`, {
                signal: AbortSignal.timeout(4000),
                redirect: "error",
              });
              await response.body?.cancel();
              if (response.status !== 401)
                throw new Error("公网入口没有返回预期的访问认证。");
              return;
            } catch (error) {
              lastError = error;
            }
            await new Promise((done) => setTimeout(done, 1000));
          }
          throw lastError;
        }
        const address = docker([...compose, "port", "app", "3001"], env);
        const response = await fetch(`http://${address}/api/healthz`, {
          signal: AbortSignal.timeout(3000),
        });
        if (!response.ok || (await response.json()).status !== "ok")
          throw new Error("本机入口健康检查失败。");
      },
    });
    const previous =
      result.previous === result.current ? state?.previous : result.previous;
    await writeFile(
      statePath,
      `${JSON.stringify({ ...result, previous, config: configPath, deployedAt: new Date().toISOString() }, null, 2)}\n`,
      { mode: 0o600 },
    );
    console.info(
      `发布成功：${result.current}。${previous ? "上一版镜像已记录，可使用 --rollback 恢复。" : "首次发布，尚无上一版镜像。"}`,
    );
  } finally {
    await rm(lock, { recursive: true, force: true });
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
