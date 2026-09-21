import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { deployApplication, docker } from "../../scripts/deploy.mjs";
import { openBrowserAcceptance } from "./browser.mjs";

const image = process.env.CONTAINER_TEST_IMAGE || "zhixu-chat:container-test";
const project = `zhixu-test-${randomUUID().slice(0, 8)}`;
const output = resolve("output/container");
await mkdir(output, { recursive: true });
await rm(`${output}/failure.log`, { force: true });
await rm(`${output}/report.json`, { force: true });
const scratch = await mkdtemp(`${output}/run-`);
const server = createServer();
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const port = server.address().port;
await new Promise((done) => server.close(done));
const caddyImage = (await readFile("compose.production.yaml", "utf8")).match(
  /image: (caddy:\S+)/,
)[1];
const password = "container-test-only-password";
const hash = docker([
  "run",
  "--rm",
  "--entrypoint",
  "caddy",
  caddyImage,
  "hash-password",
  "--plaintext",
  password,
]);
await writeFile(`${scratch}/auth.caddy`, `tester ${hash}\n`, { mode: 0o600 });
await writeFile(`${scratch}/empty.env`, "", { mode: 0o600 });
const origin = `http://127.0.0.1:${port}`;
const env = {
  ...process.env,
  APP_IMAGE: image,
  APP_ENV_FILE: `${scratch}/empty.env`,
  APP_ORIGIN: origin,
  CADDY_IMAGE: caddyImage,
  CONTAINER_TEST_PORT: String(port),
  DEMO_AUTH_FILE: `${scratch}/auth.caddy`,
  SITE_HOST: "chat.example.com",
  ACME_EMAIL: "ops@example.com",
};
const compose = [
  "compose",
  "--project-name",
  project,
  "--env-file",
  `${scratch}/empty.env`,
  "-f",
  "compose.yaml",
  "-f",
  "tests/container/compose.yaml",
];
const run = (args) => docker([...compose, ...args], env);
const headers = {
  Authorization: `Basic ${Buffer.from(`tester:${password}`).toString("base64")}`,
};
const get = (path, extra = {}) =>
  fetch(`${origin}${path}`, {
    headers: { ...headers, ...extra },
    signal: AbortSignal.timeout(5000),
  });
const post = (mode, signal) =>
  fetch(`${origin}/api/chat`, {
    method: "POST",
    headers: { ...headers, Origin: origin, "Content-Type": "application/json" },
    signal: signal ?? AbortSignal.timeout(7000),
    body: JSON.stringify({
      provider: "deepseek",
      model: "test-model",
      thinking: false,
      messages: [{ role: "user", content: mode }],
    }),
  });
const checks = [];
const passed = (name) => {
  checks.push(name);
  console.info(`✓ ${name}`);
};
async function eventually(check, timeout = 5000) {
  const until = Date.now() + timeout;
  while (true) {
    try {
      await check();
      return;
    } catch (error) {
      if (Date.now() >= until) throw error;
    }
    await delay(80);
  }
}
const temporaryImages = [];
let browser;
try {
  run(["config", "--quiet"]);
  // Validate the actual public entry configuration without publishing ports or issuing certificates.
  docker(
    [
      "compose",
      "--project-name",
      project,
      "--env-file",
      `${scratch}/empty.env`,
      "-f",
      "compose.yaml",
      "-f",
      "compose.production.yaml",
      "run",
      "--rm",
      "--no-deps",
      "gateway",
      "caddy",
      "validate",
      "--config",
      "/etc/caddy/Caddyfile",
    ],
    env,
  );
  run(["up", "--detach", "--no-build", "--wait", "--wait-timeout", "60"]);
  const id = run(["ps", "--quiet", "app"]);
  const imageId = docker(["inspect", "--format", "{{.Image}}", id]);
  const upstreamAddress = run(["port", "upstream", "4010"]);
  const stats = async () =>
    (
      await fetch(`http://${upstreamAddress}/stats`, {
        signal: AbortSignal.timeout(2000),
      })
    ).json();
  docker([
    "exec",
    id,
    "node",
    "--input-type=module",
    "-e",
    `import{existsSync,accessSync,constants}from'node:fs';import assert from'node:assert/strict';assert.notEqual(process.getuid(),0);for(const p of ['.env','.env.local','.env.runtime','local-docs','src','tests','node_modules/tsx','node_modules/typescript'])assert.equal(existsSync('/app/'+p),false,p);assert.throws(()=>accessSync('/app',constants.W_OK));`,
  ]);
  passed("镜像以非 root 运行、根文件系统只读，不含环境文件、课程和开发依赖");
  await eventually(async () => {
    assert.equal((await fetch(`${origin}/api/healthz`)).status, 401);
  });
  assert.equal(
    (await get("/api/healthz", { Authorization: "Basic aW52YWxpZA==" })).status,
    401,
  );
  assert.deepEqual(await (await get("/api/healthz")).json(), { status: "ok" });
  assert.equal(
    (await get("/api/providers", { Origin: "https://outside.example" })).status,
    403,
  );
  const providers = await (await get("/api/providers")).text();
  assert(!providers.includes("container-test-key"));
  const html = await (await get("/")).text();
  assert(html.includes('<div id="root">'));
  const asset = html.match(/src="([^"]+\.js)"/)[1];
  assert.equal((await get(asset)).status, 200);
  passed("公网 Caddy 配置校验、共享访问认证、精确来源校验及生产静态资源");

  const successful = await post("success");
  assert.equal(successful.status, 200);
  assert.match(successful.headers.get("content-type"), /text\/event-stream/);
  assert.equal(successful.headers.get("cache-control"), "no-store");
  const requestId = successful.headers.get("x-request-id");
  assert(requestId);
  const reader = successful.body.getReader();
  const decoder = new TextDecoder();
  let received = decoder.decode((await reader.read()).value);
  assert(received.includes("container answer"));
  assert.equal(
    (await stats()).at(-1).completed,
    false,
    "代理必须在上游完成前交付首块",
  );
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    received += decoder.decode(value);
  }
  assert(received.includes('"type":"done"'));
  reader.releaseLock();
  passed("真实 Caddy 及时转发首块 SSE，并保留请求编号与终态");

  const controller = new AbortController();
  const held = await post("hold", controller.signal);
  const heldReader = held.body.getReader();
  assert(
    decoder
      .decode((await heldReader.read()).value)
      .includes("container answer"),
  );
  const count = (await stats()).length;
  const busy = await post("success");
  assert.equal(busy.status, 429);
  assert.match(busy.headers.get("content-type"), /application\/json/);
  assert.equal(busy.headers.get("retry-after"), "1");
  await busy.body.cancel();
  assert.equal((await stats()).length, count);
  controller.abort();
  await heldReader.cancel().catch(() => {});
  await eventually(
    async () => assert.equal((await stats()).at(-1).closed, true),
    1500,
  );
  assert((await (await post("success")).text()).includes('"type":"done"'));
  passed("并发超限在 SSE 前返回 429；停止穿透代理并及时释放上游连接和名额");

  for (const mode of ["error", "timeout"]) {
    const response = await post(mode);
    const text = await response.text();
    assert(text.includes('"type":"error"'));
    assert(!text.includes('"type":"done"'));
    assert(!text.includes("private-test-upstream-detail"));
    if (mode === "timeout") assert(text.includes("超时"));
    assert((await (await post("success")).text()).includes('"type":"done"'));
  }
  passed("上游异常与超时可控结束，错误脱敏，后续请求可恢复");

  const oversized = await fetch(`${origin}/api/chat`, {
    method: "POST",
    headers: { ...headers, Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify({ large: "x".repeat(21 * 1024 * 1024) }),
    signal: AbortSignal.timeout(10_000),
  });
  assert.equal(oversized.status, 413);
  await oversized.body.cancel();
  const logs = run(["logs", "--no-color", "app"]);
  assert(logs.includes(requestId));
  for (const secret of [
    "container-test-key",
    "container answer",
    "private-test-upstream-detail",
    password,
  ])
    assert(!logs.includes(secret));
  passed("网关与应用限制上传大小；日志记录诊断编号且不记录密钥或对话正文");

  browser = await openBrowserAcceptance(origin, password);

  const active = new AbortController();
  const activeResponse = await post("hold", active.signal);
  await activeResponse.body.getReader().read();
  run(["restart", "app"]);
  active.abort();
  await eventually(async () =>
    assert.equal((await stats()).at(-1).closed, true),
  );
  await eventually(async () =>
    assert.deepEqual(await (await get("/api/healthz")).json(), {
      status: "ok",
    }),
  );
  passed("容器重启取消活跃上游，应用恢复健康");
  await browser.verifyRestored();

  const badImage = `${project}:unhealthy`;
  temporaryImages.push(badImage);
  const metadata = JSON.parse(
    docker(["image", "inspect", "--format", "{{json .}}", image]),
  );
  // A release image may target a different architecture from this test host.
  const platform = [metadata.Os, metadata.Architecture, metadata.Variant]
    .filter(Boolean)
    .join("/");
  execFileSync(
    "docker",
    ["build", "--platform", platform, "--tag", badImage, "-"],
    {
      input: `FROM ${image}\nHEALTHCHECK --interval=1s --timeout=1s --start-period=1s --retries=1 CMD exit 1\n`,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 120_000,
    },
  );
  await assert.rejects(
    deployApplication({ compose, image: badImage, env }),
    /已恢复旧镜像并通过健康检查/,
  );
  assert.equal(
    docker([
      "inspect",
      "--format",
      "{{.Image}}",
      run(["ps", "--quiet", "app"]),
    ]),
    imageId,
  );
  await eventually(async () =>
    assert.deepEqual(await (await get("/api/healthz")).json(), {
      status: "ok",
    }),
  );
  const release = await deployApplication({ compose, image, env });
  assert.equal(release.current, imageId);
  assert.equal(release.previous, imageId);
  passed("发布脚本拒绝不健康镜像，自动恢复上一镜像；恢复后再次发布成功");
  await browser.verifyRestored();
  passed("浏览器经认证与真实代理完成生成，同源重启和回滚后正文及草稿仍可恢复");

  const report = {
    date: new Date().toISOString(),
    image,
    imageId,
    architecture: metadata.Architecture,
    sizeBytes: metadata.Size,
    revision: metadata.Config.Labels["org.opencontainers.image.revision"],
    checks,
  };
  await writeFile(
    `${output}/report.json`,
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.info(
    `容器验收通过：${checks.length} 组，报告 output/container/report.json`,
  );
} catch (error) {
  let logs = "Docker logs unavailable.";
  try {
    logs = run(["logs", "--no-color", "--tail", "100"]);
  } catch {
    /* Preserve the original failure if Docker itself is unavailable. */
  }
  await writeFile(`${output}/failure.log`, `${error.stack}\n${logs}\n`);
  throw error;
} finally {
  await browser?.close();
  try {
    run(["down", "--volumes", "--remove-orphans"]);
    for (const temporary of temporaryImages) docker(["image", "rm", temporary]);
    await rm(scratch, { recursive: true, force: true });
  } catch {
    console.error(
      `未完成测试资源清理：${project}。恢复 Docker 后用该项目名执行 compose down。`,
    );
  }
}
