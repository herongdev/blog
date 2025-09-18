---

title: 在 TradingView（Charting Library）里实现“保存指标模板”（study\_templates）——完整前后端实战
date: 2025-09-17
tags:

* TradingView
* Charting Library
* study\_templates
* 前后端
  description: 用最小可运行的例子把“指标模板”做起来：前端开启 UI、配置存储；后端实现 REST 四件套（列/存/载/删）；附联调与常见坑；含官方文档与地址。

---

## 整体实现思路

- **目标**：在你的嵌入式 TradingView 图表里启用“指标模板”按钮，支持保存/读取一组指标及其参数。
- **核心**：Charting Library 通过 **REST API** 调你的后端：
  `charts_storage_url/{charts_storage_api_version}/study_templates?client={client_id}&user={user_id}`，必须把 `charts_storage_api_version` 设为 **"1.1"**（study templates 自 1.1 起支持）。([TradingView][1])
- **前端**：

  1. 在 Widget 里 **开启 featureset：`study_templates`**，让顶栏出现“指标模板”按钮；
  2. 配置 `charts_storage_url`、`charts_storage_api_version:"1.1"`、`client_id`、`user_id`。([TradingView][2])

- **后端**：实现 4 个端点（列/存/载/删），返回标准 JSON。你也可以用 **save_load_adapter** 走自定义存取流程，但仍需要你有后端。([TradingView][3])

---

## 分步实现过程

### 步骤一：准备与目录

- 前端：已集成 **Charting Library**（本地 `charting_library/` 静态资源）与你的 Datafeed。
- 后端：任意 Web 框架皆可，示例用 **Node.js + Express**（也可 FastAPI 等）。

> 友情提示：**“图表模板（Chart template）”≠“指标模板（Study template）**。前者是配色主题，另一个是指标组合。本教程做的是 **Study Templates**。([TradingView][2])

---

### 步骤二：前端——开启 UI + 指定存储

在你创建 `widget` 的位置，加入以下关键配置（**只看关键字段**）：

```html
<!-- index.html 片段：挂一个容器 -->
<div id="tvchart" style="width:100%;height:600px"></div>

<script src="/charting_library/charting_library.standalone.js"></script>
<script src="/charting_library/datafeeds/udf/dist/bundle.js"></script>
<script>
  function init() {
    const widget = new TradingView.widget({
      container: "tvchart",
      library_path: "/charting_library/",
      symbol: "AAPL",
      interval: "D",
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        "https://demo-feed-data.tradingview.com"
      ),
      autosize: true,

      // ↑ 复杂逻辑：启用“指标模板”按钮，并指向后端存储（必须 1.1）
      enabled_features: ["study_templates"], // 显示“指标模板”按钮
      charts_storage_url: "http://localhost:9005", // 你的后端服务根地址
      charts_storage_api_version: "1.1", // Study Templates 自 1.1 起支持
      client_id: "demo-app", // 自定义：用来分组/隔离
      user_id: "user-1", // 你的业务用户 ID
    });
  }
  window.addEventListener("DOMContentLoaded", init);
</script>
```

以上字段的含义与开启方式见 **Featuresets** 与 **Widget Options** 文档；Study Templates 的 REST 端点见 **Saving/Loading** 文档。([TradingView][2])

---

### 步骤三：后端——实现 REST 四件套

用 **Express** 起一个极简可跑的存储服务（内存版，便于本地联调；生产请换 DB）：

```js
// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // ← 复杂逻辑：允许前端跨域访问
app.use(express.json({ limit: "1mb" }));

// 简易内存存储：key = `${client}:${user}:${name}`
const store = new Map();

// 列出模板 或 读取单个模板
app.get("/1.1/study_templates", (req, res) => {
  const { client, user, chart, template } = req.query;

  // ← 复杂逻辑：若带 template 参数则返回单个；否则返回列表
  if (template) {
    const key = `${client}:${user}:${template}`;
    const item = store.get(key);
    if (!item) return res.json({ status: "error", message: "not found" });
    // ← 复杂逻辑：返回标准 data 对象（name + content）
    return res.json({
      status: "ok",
      data: { name: template, content: item.content },
    });
  }

  const list = [...store.keys()]
    .filter((k) => k.startsWith(`${client}:${user}:`))
    .map((k) => ({ name: k.split(":").slice(2).join(":") }));

  res.json({ status: "ok", data: list });
});

// 保存模板
app.post("/1.1/study_templates", (req, res) => {
  const { client, user } = req.query;
  const { name, content } = req.body;
  if (!name || !content)
    return res.json({ status: "error", message: "name/content required" });

  const key = `${client}:${user}:${name}`;
  store.set(key, { content });
  res.json({ status: "ok" });
});

// 删除模板
app.delete("/1.1/study_templates", (req, res) => {
  const { client, user, template } = req.query;
  const key = `${client}:${user}:${template}`;
  store.delete(key);
  res.json({ status: "ok" });
});

// 启动服务
app.listen(9005, () => console.log("Storage server on http://localhost:9005"));
```

> REST 端点的路径、查询参数与响应结构，均来自 **Save & load REST API / Indicator template methods** 的官方定义。([TradingView][3])

---

### 步骤四：联调与自测

1. 启动后端：`node server.js`
2. 打开前端页面 → 顶部会出现 **“指标模板”** 按钮。
3. 任意加几个指标 → 点击“指标模板 → 保存为…”；随后可在“打开模板”里看到刚保存的项。
4. 浏览器开发者工具中可看到对 `.../1.1/study_templates?...` 的网络请求。
   （如 URL 出现 `undefined`，通常是未配置 `charts_storage_url`/`charts_storage_api_version`/`client_id`/`user_id`，或版本不是 1.1。）([TradingView][1])

---

### 步骤五：（可选）低层自定义

若你要插入鉴权头、改错误处理或自己接管存取流程，可实现 **`save_load_adapter`** 并在 Widget 里设置 `save_load_adapter: {...}`。官方提供接口说明与示例。([TradingView][4])

---

## 最简代码示例（可直接跑）

> **前端最小化 HTML**（静态托管即可）与 **后端 Express**（内存存储）。复杂位置均已在上一行加注释。

```html
<!-- public/index.html -->
<div id="tvchart" style="width:100%;height:600px"></div>
<script src="/charting_library/charting_library.standalone.js"></script>
<script src="/charting_library/datafeeds/udf/dist/bundle.js"></script>
<script>
  const w = new TradingView.widget({
    container: "tvchart",
    library_path: "/charting_library/",
    symbol: "AAPL",
    interval: "D",
    datafeed: new Datafeeds.UDFCompatibleDatafeed(
      "https://demo-feed-data.tradingview.com"
    ),
    // ← 复杂逻辑：启用“指标模板”并指定 1.1 存储端点与用户
    enabled_features: ["study_templates"],
    charts_storage_url: "http://localhost:9005",
    charts_storage_api_version: "1.1",
    client_id: "demo-app",
    user_id: "user-1",
  });
</script>
```

```bash
# 后端依赖并启动
npm i express cors
node server.js
```

---

## 常见问题与排错

- **URL 出现 `/undefined/.../study_templates?client=undefined&user=undefined`**
  ⇒ 没配或配错 `charts_storage_url / charts_storage_api_version / client_id / user_id`；确认版本为 **"1.1"**。([TradingView][1])
- **看不到“指标模板”按钮**
  ⇒ 未启用 `enabled_features: ['study_templates']`，或使用的不是 Advanced Charts/Charting Library。([TradingView][2])
- **返回结构不对**
  ⇒ 对照“Indicator template methods”的请求/响应格式改正字段。([TradingView][5])
- **与“图表模板”混淆**
  ⇒ Chart template 是配色主题，另有 `chart_template_storage` feature，与 Study template 无关。([TradingView][2])

---

## 官方文档与地址（建议收藏）

```text
# Saving & Loading 概览（含三种实现方式：REST / Adapter / Low-level）
https://www.tradingview.com/charting-library-docs/latest/saving_loading/          # :contentReference[oaicite:12]{index=12}

# REST API 总入口
https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/
# 指标模板（study_templates）四件套
https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/indicator-template-methods/   # :contentReference[oaicite:13]{index=13}

# Widget 关键参数（含 charts_storage_* 与版本说明）
https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/   # :contentReference[oaicite:14]{index=14}

# 开启/关闭功能（Featuresets 表）
https://www.tradingview.com/charting-library-docs/latest/customization/Featuresets/                                      # :contentReference[oaicite:15]{index=15}

# API Handlers save_load_adapter（自定义存取钩子）
https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-adapter/                               # :contentReference[oaicite:16]{index=16}
```

---

## 小结

- 前端：启用 `study_templates`，并配置 `charts_storage_url + charts_storage_api_version:"1.1" + client_id + user_id`。
- 后端：按官方 REST 规范实现 **列/存/载/删** 四件套即可跑通。
- 若你给我当前前端 `widget` 选项与后端一条实际响应（去敏），我可以继续帮你“逐行对照文档”把最后的坑补齐。

[1]: https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/?utm_source=chatgpt.com "Interface: ChartingLibraryWidgetOptions | Advanced Charts ..."
[2]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/?utm_source=chatgpt.com "Saving and loading charts | Advanced Charts Documentation"
[3]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/?utm_source=chatgpt.com "Save and load REST API | Advanced Charts Documentation"
[4]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-adapter/?utm_source=chatgpt.com "API handlers for saving and loading | Advanced Charts ..."
[5]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/indicator-template-methods/?utm_source=chatgpt.com "Indicator template methods | Advanced Charts ..."

---

title: TradingView 指标模板请求参数是 undefined？一眼看穿并修好
date: 2025-09-17
tags:

- TradingView
- Charting Library
- study_templates
  description: 你的请求 URL 出现 /charting_library/undefined/undefined/study_templates?client=undefined\&user=undefined，说明未正确配置 charts_storage_url / charts_storage_api_version / client_id / user_id，或把 library_path 误当成存储地址。下面给出最小修改片段与自检清单。

---

## 发生了什么（快速诊断）

你看到的
`http://localhost:9005/charting_library/undefined/undefined/study_templates?client=undefined&user=undefined`
对应的是 **“指标模板 REST API”**，正确格式应为：
`{charts_storage_url}/{charts_storage_api_version}/study_templates?client={client_id}&user={user_id}`。当这些参数没配/配错时，就会出现 `undefined` 串联到 URL 里。([TradingView][1])

> 结论：**charts_storage_url / charts_storage_api_version / client_id / user_id 未设置**，或把 **library_path**（静态资源路径）误当成了 charts_storage_url（数据存储服务地址）。([TradingView][2])

---

## 只改需要改的代码（最小补丁）

在你创建 `widget` 的地方补齐/修正如下选项（不要贴全文件，只替换或新增这些行）：

```js
// ✅ 指标模板需要的存储配置（REST）
enabled_features: ['study_templates'], // 开启模板功能  ← 复杂逻辑：启用相关 UI 与调用
charts_storage_url: 'http://localhost:9005', // 你的后端存储服务根地址（别用 library_path）
charts_storage_api_version: '1.1',           // 版本号固定用 1.1
client_id: 'your-app',                        // 你的应用名，用于分组
user_id: 'user-123',                          // 你系统里能标识用户的唯一ID
```

这些字段的含义与要求见官方文档（`study_templates` 的增删改查都走这个 REST 前缀）。([TradingView][1])

---

## 你的后端要响应哪些接口？

最少要实现以下 REST 路由（以 `charts_storage_url = http://localhost:9005` 为例）：

- `GET  /1.1/study_templates?client={client}&user={user}` → 返回模板列表
- `POST /1.1/study_templates?client={client}&user={user}` → 保存模板（body: `name`, `content`）
- `GET  /1.1/study_templates?client={client}&user={user}&chart={id}&template={name}` → 读取模板
- `DELETE /1.1/study_templates?client={client}&user={user}&template={name}` → 删除模板
  返回结构与字段见官方“Indicator template methods”。([TradingView][1])

> 想省事：官方给了**完整示例后端**（Python + PostgreSQL），可直接跑起来再按需改造。([GitHub][3])

---

## 自检清单（按顺序排查）

1. **确认没把 `library_path` 当存储地址**：`library_path` 只用于加载前端静态资源。([TradingView][2])
2. **前端参数四件套齐全**：`charts_storage_url / charts_storage_api_version / client_id / user_id`。([TradingView][2])
3. **已启用模板功能**：`enabled_features: ['study_templates']`（视集成需要）。示例与第三方教程均有此配置。([DEV Community][4])
4. **后端路由与返回格式正确**：路径、查询串与 JSON 字段符合文档。([TradingView][1])
5. 若不想走 REST，也可实现 **`save_load_adapter`** 接口由你接管保存/加载逻辑（低层 API）。([TradingView][5])

---

## 什么时候会仍然“空空如也”？

- 你的后端返回 `status: "ok"` 但 `data` 为空（首次使用很正常）。([TradingView][1])
- 请求被浏览器扩展或跨域策略拦截（检查 CORS、代理与拦截器）。
- 仍在第三方“嵌入图表”但其侧**未启用 study_templates**。

---

## 需要我继续跟进吗？

把你当前的 `widget` 配置片段（仅含上面这些字段）和后端接口返回的一条实际响应（去隐私）发我，我帮你对照文档核对参数与返回格式，定位剩余问题。

[1]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/indicator-template-methods/?utm_source=chatgpt.com "Indicator template methods | Advanced Charts ..."
[2]: https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/?utm_source=chatgpt.com "Interface: ChartingLibraryWidgetOptions | Advanced Charts ..."
[3]: https://github.com/tradingview/saveload_backend?utm_source=chatgpt.com "tradingview/saveload_backend"
[4]: https://dev.to/amree/how-to-integrate-tradingview-s-html5-charting-library-with-ruby-on-rails-v6-13be?utm_source=chatgpt.com "How to Integrate TradingView's HTML5 Charting Library ..."
[5]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-adapter/?utm_source=chatgpt.com "API handlers for saving and loading | Advanced Charts ..."
