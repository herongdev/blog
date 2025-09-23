# Web 图片性能与体验：一份「能落地」的 Hexo 教程（超全）

> 目标：在保持高画质的前提下，把**首屏更快、滚动更稳、流量更省、渲染更顺**做到极致。
> 读者画像：前端/全栈工程师，Hexo 搭建博客或文档站，或任意 Web 项目。

---

## 一、选对格式：画质与体积的第一步

**优先级推荐**（从上到下试用）：

1. **AVIF**：同等画质体积最小；缺点是编码较慢，老旧浏览器少数不支持。
2. **WebP**：普及度高、编码快；大多场景优于 JPEG/PNG。
3. **SVG**：矢量图标/Logo/示意图首选；可缩放、体积小、可变色（`currentColor`）。
4. **PNG**：透明/像素级 UI；截图/纯色块不推荐 PNG（试试 WebP/AVIF）。
5. **JPEG**：摄影类大图兜底；调小质量（如 75\~85）。
6. **视频替代动图**：把 **GIF 改成 MP4/WebM**（体积能小一个数量级）。

> 动图优先：**WebM/MP4** > WebP 动图 > GIF。
> UI 图标优先：**SVG**（Inline/Sprite）> Web 字体图标（不推荐，抗锯齿/闪烁问题多）。

---

## 二、响应式与视网膜适配：只给当前设备合适那份

### 1) `srcset + sizes`（同图不同分辨率）

```html
<!-- 复杂逻辑：根据视口宽度选择最合适的资源，避免过载 -->
<img
  src="/images/hero-800.webp"
  srcset="
    /images/hero-400.webp   400w,
    /images/hero-800.webp   800w,
    /images/hero-1600.webp 1600w
  "
  sizes="(max-width: 600px) 90vw, 800px"
  width="800"
  height="450"
  alt="Hero"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
/>
```

### 2) `picture`（艺术裁切/多格式降级）

```html
<!-- 复杂逻辑：浏览器优先 AVIF，否则 WebP，最后 JPEG；同时可换裁切比例 -->
<picture>
  <source
    type="image/avif"
    srcset="/img/cover@1x.avif 1x, /img/cover@2x.avif 2x"
  />
  <source
    type="image/webp"
    srcset="/img/cover@1x.webp 1x, /img/cover@2x.webp 2x"
  />
  <img
    src="/img/cover@1x.jpg"
    width="1200"
    height="630"
    alt="Cover"
    loading="lazy"
    decoding="async"
  />
</picture>
```

> **注意**：**强烈写上 `width`/`height`** 或 CSS `aspect-ratio`，避免 CLS（布局抖动）：

```css
.hero {
  aspect-ratio: 16 / 9; /* 或者写死 width/height 属性 */
}
```

---

## 三、加载策略：更快的首屏、更稳的滚动

### 1) Lazy 与优先级

- **首屏关键图**：`fetchpriority="high"`（Chrome 支持） + 不加 `loading="lazy"`。
- **非首屏**：`loading="lazy"` + `decoding="async"` + `fetchpriority="low"`。
- **骨架/占位**：CSS 背景或 LQIP/BlurHash（下文有示例）。

```html
<!-- 复杂逻辑：首屏大图提升优先级 -->
<img
  src="/img/kv.avif"
  width="1200"
  height="630"
  alt="KV"
  decoding="async"
  fetchpriority="high"
/>
```

### 2) 预连接/预解析（CDN 首次用前）

```html
<!-- 复杂逻辑：减少握手延迟 -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

### 3) 稳定 vnode 与缓存

- `:key` 用 **URL** 或 **稳定 id**；
- **别反复销毁/重建 `<img>`**（尤其虚拟列表里），只更新 `src` 即可。

---

## 四、缓存与 CDN：**URL 指纹 + 长缓存 + 免协商**

### 1) 命名与头部推荐

- 文件名加 hash：`/img/avatar.6f3c1b2.avif`
- 头部：

  ```
  Cache-Control: public, max-age=31536000, immutable
  ```

- 更新图片时改 **文件名**（hash 变），浏览器立刻换新且**旧图永久命中**。

### 2) Nginx/CDN 示例

```nginx
# 复杂逻辑：AVIF/WebP/SVG 长缓存；变更靠文件名 hash
location ~* \.(avif|webp|png|jpg|jpeg|gif|svg)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
  try_files $uri =404;
}
```

> 不推荐：`no-store` 或无 `max-age` ⇒ 频繁条件请求，浪费 RTT。

---

## 五、SVG：图标/Logo 的终极形态

### 1) Inline（可变色、可动画）

```html
<!-- 复杂逻辑：用 currentColor 跟随文字色；能减少额外请求 -->
<svg
  width="20"
  height="20"
  aria-hidden="true"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="..." />
</svg>
```

### 2) Sprite（批量图标）

```html
<!-- 复杂逻辑：构建时合并为 sprite.svg，运行时按需引用 -->
<svg class="icon"><use href="/sprite.svg#icon-star" /></svg>
```

### 3) 安全与跨域

- **不要**把外链 SVG 直接 `innerHTML` 注入；
- 采用 **白名单构建/消毒**（SVGO + DOMPurify）；
- `<object>`/`<embed>` 加载外源 SVG 会遇到 CORS 与安全隔离，**一般不建议**。

---

## 六、失败兜底与重试：体验「不破像」

### 1) 失败 → 占位 + 退避重试 1 次

```html
<img
  id="avatar"
  src="/img/u/123.avif"
  width="64"
  height="64"
  alt="User avatar"
/>
<script>
  // 复杂逻辑：网络抖动时退避一次；仍失败显示占位
  const img = document.getElementById("avatar");
  let retried = false;
  img.onerror = () => {
    if (!retried) {
      retried = true;
      const u = new URL(img.src, location.href);
      u.searchParams.set("_t", Date.now() % 1e7);
      img.src = u.toString();
    } else {
      img.replaceWith(
        Object.assign(document.createElement("div"), {
          className: "avatar-fallback",
          innerText: "U",
        })
      );
    }
  };
</script>
```

### 2) LQIP/BlurHash（渐进）

- 先用**极小尺寸/模糊**位图占位，再淡入清晰版本；
- 可用 **sharp** 生成低清缩略图（base64）。

---

## 七、Service Worker（可选）：离线与二级缓存

- 非首屏/非关键资源：**Stale-While-Revalidate**；
- 头像/图标：**Cache First**；
- 大图：**Network First** + 超时回退缓存。

用 Workbox 快速配置：

```ts
// 复杂逻辑：workbox 路由缓存图片
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "img-v1",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 3600,
      }),
    ],
  })
);
```

---

## 八、无障碍与 SEO：不丢细节

- 每张图写好 **`alt`**（装饰图可 `alt="" aria-hidden="true"`）；
- `width`/`height` 明确 or `aspect-ratio`，避免 CLS；
- 文章社交卡片：提供 **1200×630** 的 OG 图（`og:image`/`twitter:image`）；
- Favicon：`favicon.ico` + `apple-touch-icon.png` + `mask-icon.svg`。

---

## 九、Hexo 实战：从 Markdown 到全站自动化

### 1) 目录与资源

```
source/
  _posts/
  images/               # 原始大图
  icons/                # SVG/位图图标
  ...
```

### 2) 构建阶段自动生成 WebP/AVIF + 多尺寸

**安装依赖**（Node 本地）：

```bash
npm i -D sharp globby
```

**`scripts/gen-images.mjs`**：

```js
// 复杂逻辑：用 sharp 批量生成多尺寸 AVIF/WebP，并加 hash 命名
import { globby } from "globby";
import sharp from "sharp";
import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join, basename, extname } from "path";

const sizes = [400, 800, 1600];
const formats = [
  { ext: "avif", opt: { quality: 45, speed: 1 } },
  { ext: "webp", opt: { quality: 70 } },
];

const files = await globby(["source/images/**/*.{jpg,jpeg,png}"]);
for (const file of files) {
  const buf = await readFile(file);
  const name = basename(file, extname(file));
  for (const w of sizes) {
    const pipeline = sharp(buf).resize({ width: w });
    for (const { ext, opt } of formats) {
      const out = await pipeline.clone()[ext](opt).toBuffer();
      const hash = createHash("md5").update(out).digest("hex").slice(0, 8);
      const outPath = join("source", "images", `${name}-${w}.${hash}.${ext}`);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, out);
    }
  }
}
```

**`package.json`**：

```json
{
  "scripts": {
    "img:build": "node scripts/gen-images.mjs",
    "build": "npm run img:build && hexo generate"
  }
}
```

> 写文章时只放原图；构建时产出多格式多尺寸带 hash 文件。模板里按规则组装 `srcset`。

### 3) Hexo 插件与主题建议

- **懒加载**：`hexo-filter-image-lazyload`（或主题自带）
- **压缩/指纹**：`hexo-all-minifier`、`hexo-asset-pipeline`
- **响应式**：自定义 `post.ejs`/`post.njk` 模板，根据图片命名规则输出 `srcset/sizes/picture`。
- **SVG 优化**：构建阶段跑 **SVGO**。
- **站点图标**：在主题 `_config.yml` 填好 favicon、mask-icon、apple-touch-icon。

**文章里写法**（示例短代码思路）：

```ejs
<%# 复杂逻辑：给一个基名，模板自动匹配构建产物，生成 picture + srcset %>
<%- image_responsive('hero') %>
```

---

## 十、组件级最佳实践（Vue/React 通用点）

- `<img decoding="async" fetchpriority="low|high" loading="lazy">`
- **用 URL 或稳定 id 做 key**；不要在滚动中频繁卸载/新建 `<img>`；
- 列表中图标走 **SVG inline/sprite** 或 **已缓存位图**；
- 错误时**占位/重试一次**，不要无穷递归；
- 虚拟列表场景：**行高估算与真实一致**，避免频繁重排。

---

## 十一、排查与监控

- **Lighthouse/PageSpeed**：看 LCP/CLS/TTFB/Preload 等建议。
- **WebPageTest**：瀑布图定位谁阻塞；看是否命中 200/304/缓存。
- **Core Web Vitals**：重点 LCP（大图）、CLS（未定尺寸）、INP（主线程阻塞）。
- **浏览器 DevTools**：

  - Network：看 `from memory cache/disk cache`；
  - Performance：是否因图像解码阻塞主线程；
  - Coverage：是否加载了用不到的巨图。

---

## 速查清单（贴墙版）

- [ ] 首选 **AVIF/WebP**，动图用 **视频**；图标用 **SVG**
- [ ] **`width/height`** 或 **`aspect-ratio`**，杜绝 CLS
- [ ] 首屏图 `fetchpriority="high"`；其余 `loading="lazy" decoding="async"`
- [ ] `picture + srcset + sizes`，只给设备要的那份
- [ ] **URL 指纹 + immutable 长缓存**；更新靠文件名
- [ ] 预连 CDN：`<link rel="preconnect">`
- [ ] 失败 **退避重试 1 次**；否则占位
- [ ] SVG 用 **inline/sprite**，SVGO 压缩，慎用 `<object>`
- [ ] Hexo 构建用 **sharp** 批量产多尺寸多格式
- [ ] 虚拟列表里 **稳定 key**，别频繁重建 `<img>`

---

需要我把你现有 Hexo 主题里**图片渲染模板**（`post.ejs`/`post.njk`）和 **Nginx 配置**按上面的规范直接改成可用版本吗？我可以给你**可拷贝的片段**，并按你的路径结构和 CDN 域名一起适配。
