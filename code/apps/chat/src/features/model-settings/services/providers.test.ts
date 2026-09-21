import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultProviders, getProviderInfo } from "./providers";

afterEach(() => vi.unstubAllGlobals());
describe("模型发现的项目边界回归", () => {
  it("[APP-CONFIG-001] 错误结构、重复供应商、空模型不能进入页面状态", async () => {
    for (const body of [
      null,
      {},
      { providers: [] },
      {
        providers: [
          defaultProviders[0],
          defaultProviders[0],
          defaultProviders[2],
        ],
      },
      { providers: defaultProviders.map((p) => ({ ...p, models: [] })) },
      {
        providers: defaultProviders.map((p) => ({ ...p, configured: "true" })),
      },
    ]) {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => Response.json(body)),
      );
      await expect(getProviderInfo()).rejects.toThrow("模型配置数据格式异常");
    }
  });
  it("[APP-CONFIG-001] 合法配置只返回公开字段", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          providers: defaultProviders.map((p) => ({
            ...p,
            internal: "not-public",
          })),
        }),
      ),
    );
    expect(await getProviderInfo()).toEqual(defaultProviders);
  });
});
