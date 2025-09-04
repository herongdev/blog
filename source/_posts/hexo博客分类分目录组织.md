---
title: Hexo 千篇文章的“分目录存储 + 目录树导航”实战（含 URL、分类、脚手架）
date: 2025-09-04
categories: [web应用开发, 前端]
tags: [Hexo, 分类, 目录, GitHub Pages, NexT]
---

> 目标：当文章**成千上万**时，既能在磁盘上**分目录管理**，又能在站点里以**目录树（分类层级）**浏览，并让 **URL 跟随分类层级**，同时保持 GitHub Project Pages 的子路径（`/blog/`）不乱。

---

## TL;DR（1 屏跑通）

1. **物理分目录**：`source/_posts/` 下建多级子目录；`hexo new post 路径/标题` 可直接写入对应子目录。
2. **URL 跟随分类层级**：把 `permalink` 改成 `:categories/:title/`，并在每篇文章的 front-matter 写层级 `categories: [父, 子]`。
3. **目录树页面**：确认有 `source/categories/index.md`（`type: categories`），NexT 会按层级展示。
4. **脚手架（scaffolds）**：为高频目录建模板，一键新建时自动带好层级分类。
5. **GitHub Pages 子路径**：你是项目页 → 继续保持 `url: https://<你>.github.io/<仓库名>` 与 `root: /<仓库名>/`。

---

## 一、物理分目录（递归扫描，直接可用）

Hexo 会**递归**读取 `source/_posts/` 的子目录，所以可以放心分层管理。

```bash
# 在 _posts 下建立层级目录
mkdir -p source/_posts/GIS/GeoServer
mkdir -p source/_posts/前端/NextJS

# 新建文章时直接带路径（两种都行）
hexo new post GIS/GeoServer/切片入门
hexo new "GIS/GeoServer/缓存与预热"
```

```yaml
# 复杂：建议开启“同名资源文件夹”，让每篇文章的图片等资产跟随文章文件夹
# _config.yml（站点根配置）只需改这一行
post_asset_folder: true
```

> 开启后，`hexo new post GIS/GeoServer/切片入门` 会生成
> `source/_posts/GIS/GeoServer/切片入门.md` 与 `source/_posts/GIS/GeoServer/切片入门/`（放图）。

## 二、URL & 页面跟“分类层级”走（而不是物理目录名）

**关键点**：页面导航与 URL 建议依赖 **front-matter 的 categories**，而不是物理目录。
这样**更可控**（物理目录可随时重构、不影响 URL）。

```yaml
# 复杂：让文章链接包含“分类层级”
# _config.yml（站点根配置）
permalink: :categories/:title/
```

> 你在 GitHub Project Pages（项目页），**继续保持子路径**（别动就对了）：

```yaml
# 复杂：站点部署在 /blog/ 子路径下
url: https://herongxhr-netizen.github.io/blog
root: /blog/
```

在每篇文章顶部写**层级分类**（数组顺序即层级）：

```md
---
title: 切片入门
date: 2025-09-04
# 复杂：层级分类会生成 /GIS/GeoServer/ 的目录层级与 URL
categories: [GIS, GeoServer]
tags: [GeoServer, 切片, 缓存]
# （可选）若想自定义更友好的英文链接
# slug: geoserver-tiling-intro
---
```

## 三、目录树页面与导航菜单

确认你已有分类页与标签页（否则先创建）：

```bash
hexo new page categories
hexo new page tags
```

编辑索引页 front-matter（**只需这几行**）：

```md
---
title: 分类
type: categories
---
```

```md
---
title: 标签
type: tags
---
```

在 NexT 主题菜单里露出入口（`themes/next/_config.yml`）：

```yaml
# 复杂：在菜单里显示分类/标签
menu:
  home: /
  categories: /categories/
  tags: /tags/
```

---

## 四、批量高效新建：自定义脚手架（scaffolds）

为高频目录做脚手架，自动带上层级分类与常用字段。

**示例 1：GIS 系列脚手架**
创建 `scaffolds/gis.md`：

```md
---
title: { { title } }
date: { { date } }
# 复杂：预置层级分类，后续文章自动套用
categories: [GIS, GeoServer]
tags:
---
```

使用（指定脚手架名）：

```bash
# 复杂：--s 指定使用自定义脚手架 "gis"
hexo new --s gis "瓦片缓存策略"
```

**示例 2：NextJS 系列脚手架**
`scaffolds/nextjs.md`：

```md
---
title: { { title } }
date: { { date } }
categories: [前端, NextJS]
tags:
---
```

使用：

```bash
hexo new --s nextjs "App Router 与 RBAC"
```

> 贴士（可选）：在 `package.json` 里加脚本别名，敲更短：

```json
{
  "scripts": {
    "new:gis": "hexo new --s gis",
    "new:next": "hexo new --s nextjs"
  }
}
```

使用：`npm run new:gis "OpenLayers 点聚合最佳实践"`

---

## 五、目录结构示例（仅供参考）

```
source/_posts/
├─ GIS/
│  └─ GeoServer/
│     ├─ 切片入门.md
│     ├─ 切片入门/         # 文章同名资源文件夹（图片等）
│     └─ 缓存与预热.md
└─ 前端/
   └─ NextJS/
      └─ App Router 与 RBAC.md
```

> **注意**：物理目录**不会**自动变成 URL；URL 由 `permalink` + 文章的 `categories` 决定。

---

## 六、搜索与站点生成（与你现有配置兼容）

你已使用 `hexo-generator-searchdb`（本地搜索），与分目录/层级分类**无冲突**，无需额外改动。
每次发文后按旧流程即可：

```bash
hexo clean && hexo g && hexo s
# 自动部署（GitHub Actions）仍是：git add . && git commit && git push
```

---

## 七、常见坑位（快速定位）

- **页面 404 / 样式丢失**：`_config.yml` 的 `url/root` 未按**项目页子路径**设置（应为 `/blog/`）。
- **URL 没有层级**：缺少 `permalink: :categories/:title/` 或文章没写 `categories: [父, 子]`。
- **分类页不展示树**：`source/categories/index.md` 的 `type` 不是 `categories`；或主题菜单未加入口。
- **物理目录改变但 URL 想保持不变**：别动 front-matter 的 `categories`，URL 就不会变。
- **想迁移到“用户页”（根路径）**：把仓库改名为 `<用户名>.github.io`，并把

  ```yaml
  # 复杂：用户页改为根路径部署
  url: https://<用户名>.github.io
  root: /
  ```

  重新部署即可。

---

## 复盘清单（照这个一项项核对）

- [ ] `_config.yml` 已设置

  ```yaml
  permalink: :categories/:title/
  url: https://herongxhr-netizen.github.io/blog
  root: /blog/
  post_asset_folder: true
  ```

- [ ] 文章 front-matter 用层级分类（`[父, 子]`）。
- [ ] 有 `source/categories/index.md` 与 `type: categories`。
- [ ] NexT 菜单里有 `/categories/` 与 `/tags/`。
- [ ] 脚手架按需要创建（`scaffolds/*.md`），新建时用 `hexo new --s <脚手架> "标题"`。

---

### FAQ

**Q：必须物理分目录吗？**
A：不是必须，但**强烈建议**。这样 Git 与编辑器里都更可管理；而 URL/导航交给分类层级来控制，二者解耦。

**Q：以后想批量重构目录怎么办？**
A：直接移动文件夹即可；只要 front-matter 的 `categories` 不改，URL 不会变（避免 SEO 损失）。

**Q：图片怎么引用？**
A：启用 `post_asset_folder: true` 后，文章内用相对路径（如 `![](切片入门/示意图.png)`）即可。

---

> 以上就是“**物理分目录管理 + 分类层级导航 + 目录式 URL + 脚手架提效**”的完整做法。
> 你把这篇存进 `source/_posts/建站/Hexo-目录树实战.md`，之后照清单回头复习即可。

```
::contentReference[oaicite:0]{index=0}
```
