---
title: TradingView `study_templates` 的 CRUD 端点（含最小后端示例）
date: 2025-09-17
tags:
---

## REST 端点一览（官方定义）

> `charts_storage_url/{charts_storage_api_version}/study_templates?client={client_id}&user={user_id}`
> 版本：**1.1**；动作：**List / Save / Load / Delete**。([TradingView][1])

### 1) 列表（R：List）

- **GET** `/1.1/study_templates?client=...&user=...`
- **响应**：

```json
{ "status": "ok", "data": [{ "name": "MyTemplate" }] }
```

（返回所有模板名）([TradingView][1])

### 2) 保存（C：Create；亦用于覆盖“U：Update”）

- **POST** `/1.1/study_templates?client=...&user=...`
- **请求体**：

```json
{ "name": "MyTemplate", "content": "{...library-supplied-json...}" }
```

- **响应**：`{ "status": "ok" }`

> 文档未提供单独“更新”端点；**同名 POST 即覆盖**。如需“重命名”，自行实现“读旧 → 存新 → 删旧”。([TradingView][1])

### 3) 读取（R：Load）

- **GET** `/1.1/study_templates?client=...&user=...&chart={chart_id}&template={name}`
- **响应**：

```json
{ "status": "ok", "data": { "name": "MyTemplate", "content": "{...}" } }
```

（`chart` 为当前图表 id，库会带上）([TradingView][1])

### 4) 删除（D：Delete）

- **DELETE** `/1.1/study_templates?client=...&user=...&template={name}`
- **响应**：`{ "status": "ok" }` ([TradingView][1])

> 以上端点路径与 `client_id / user_id / charts_storage_api_version(=1.1)` 的来源见 REST 概览。([TradingView][2])

---

## 最小后端路由片段（Express）

> 只给“需要的代码”，可直接粘到你的 `server.js` 中；复杂逻辑已在上一行注释。

```js
// 列出或读取单个模板
app.get("/1.1/study_templates", (req, res) => {
  const { client, user, chart, template } = req.query;
  // ← 复杂逻辑：带 template= 则返回单个；否则返回列表
  if (template) {
    const key = `${client}:${user}:${template}`;
    const item = store.get(key);
    return res.json(
      item
        ? { status: "ok", data: { name: template, content: item.content } }
        : { status: "error", message: "not found" }
    );
  }
  const list = [...store.keys()]
    .filter((k) => k.startsWith(`${client}:${user}:`))
    .map((k) => ({ name: k.split(":").slice(2).join(":") }));
  res.json({ status: "ok", data: list });
});

// 保存（创建/覆盖）
app.post("/1.1/study_templates", (req, res) => {
  const { client, user } = req.query;
  const { name, content } = req.body;
  // ← 复杂逻辑：同名即覆盖，实现“U”
  if (!name || !content)
    return res.json({ status: "error", message: "name/content required" });
  store.set(`${client}:${user}:${name}`, { content });
  res.json({ status: "ok" });
});

// 删除
app.delete("/1.1/study_templates", (req, res) => {
  const { client, user, template } = req.query;
  store.delete(`${client}:${user}:${template}`);
  res.json({ status: "ok" });
});
```

---

## 前端对接要点（再次强调）

```js
// ← 复杂逻辑：不配这些就会出现 /undefined/... 的错误 URL
enabled_features: ['study_templates'],
charts_storage_url: 'http://localhost:9005',
charts_storage_api_version: '1.1',
client_id: 'your-app',
user_id: 'user-123',
```

（以上字段与行为来自官方“Saving & Loading / REST”与“Indicator template methods”。）([TradingView][2])

---

## 参考文档

- Save & load REST API（总览、示例后端、参数解释）([TradingView][2])
- Indicator template methods（四个端点的请求与响应）([TradingView][1])

如果你用的是 **NestJS** 或需要 **重命名** 的自定义端点，我可以按你项目结构给出“最小改动片段”。

[1]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/indicator-template-methods/ "Indicator template methods | Advanced Charts Documentation"
[2]: https://www.tradingview.com/charting-library-docs/latest/saving_loading/save-load-rest-api/ "Save and load REST API | Advanced Charts Documentation"
