import { expect, test } from "@playwright/test";

test("compiled Nest API serves metadata and JSON errors alongside the client build", async ({
  request,
}) => {
  const page = await request.get("/");
  expect(page.status()).toBe(200);
  expect(page.headers()["content-type"]).toContain("text/html");

  const metadata = await request.get("/api/providers");
  expect(metadata.status()).toBe(200);
  expect(metadata.headers()["cache-control"]).toBe("no-store");
  expect(metadata.headers()["x-powered-by"]).toBeUndefined();
  const { providers } = await metadata.json();
  expect(
    providers.map(
      ({ id, configured }: { id: string; configured: boolean }) => ({
        id,
        configured,
      }),
    ),
  ).toEqual([
    { id: "local", configured: true },
    { id: "aliyun", configured: false },
    { id: "deepseek", configured: false },
  ]);

  const invalid = await request.post("/api/chat", { data: {} });
  expect(invalid.status()).toBe(400);
  expect(await invalid.json()).toEqual({
    error: "请求格式不正确，请检查输入与模型配置。",
  });

  const missing = await request.get("/api/missing");
  expect(missing.status()).toBe(404);
  expect(await missing.json()).toHaveProperty("error");

  // The static root is dist/client; backend bundles must never be served as assets.
  const serverBundle = await request.get("/server/app.js");
  expect(serverBundle.headers()["content-type"]).toContain("text/html");
  expect(await serverBundle.text()).toBe(await page.text());
});
